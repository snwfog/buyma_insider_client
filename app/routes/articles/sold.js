import Ember from "ember";
import config from "../../config/environment";
import UserSoldArticle from "../../models/user/sold-article";

const { APP: { saleTaxPct, buymaCutPct } }     = config;
const { computed, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  model(params, transition) {
    const applicationModels = this.modelFor('application');
    const { article }       = this.modelFor('articles');
    const soldArticle       = this.store.find('user/sold_article', params.user_sold_article_id);
    return hash(Ember.merge({
      article,
      soldArticle,
    }, applicationModels));
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
    controller.reopen({
      soldArticleStatuses: computed(function () {
        var statuses    = Ember.copy(UserSoldArticle.STATUS);
        var soldArticle = models.soldArticle;
        return Object.keys(statuses).reduce((memoStatus, status) => {
          memoStatus[ status ] = soldArticle.get(`${status}At`);
          return memoStatus;
        }, statuses);
      }),

      allShippingServices: computed(function() {
        return this.store.peekAll('shippingService');
      }),

      // Article price-balance sheet variable
      soldArticlePrice: computed('soldArticle.price.amount', function () {
        return this.exchangeRatesService.cad2jpy(this.get('soldArticle.price.amount'));
      }),

      soldArticleSoldPrice: computed.alias('soldArticle.soldPrice.amount'),

      saleTaxPct:                   computed(() => saleTaxPct),
      _soldArticlePriceWithSaleTax: null,
      soldArticlePriceWithSaleTax:  computed('soldArticle.price.amount', function () {
        const soldArticlePriceWithSaleTax = this.get('_soldArticlePriceWithSaleTax') || this.store.createRecord('money', { base: 'cad' });
        const soldArticlePrice            = this.get('soldArticle.price.amount');
        soldArticlePriceWithSaleTax.set('amount', soldArticlePrice * (1 + saleTaxPct / 100));
        this.set('_soldArticlePriceWithSaleTax', soldArticlePriceWithSaleTax);
        return soldArticlePriceWithSaleTax;
      }),

      _profit: null,
      profit:  computed('soldArticlePriceWithSaleTax.amount', 'soldArticleSoldPrice', function () {
        const profit                     = this.get('_profit') || this.store.createRecord('money', { base: 'jpy' });
        const soldArticlePriceWithTaxJpy = this.exchangeRatesService.convertCurrency(
          'cad', 'jpy', this.get('soldArticlePriceWithSaleTax.amount'));
        profit.set('amount', -Number(soldArticlePriceWithTaxJpy) + Number(this.get('soldArticleSoldPrice')));
        this.set('_profit', profit);
        return profit;
      }),

      buymaCutPct: computed(() => buymaCutPct),
      _buymaCut:   null,
      buymaCut:    computed('soldArticleSoldPrice', function () {
        const buymaCut = this.get('_buymaCut') || this.store.createRecord('money', { base: 'jpy' });
        buymaCut.set('amount', Number(this.get('soldArticleSoldPrice')) * (buymaCutPct / 100));
        this.set('_buymaCut', buymaCut);
        return buymaCut;
      }),

      _totalEarned: null,
      totalEarned:  computed('profit.amount', 'buymaCut.amount', 'soldArticle.shippingServices.[]', function () {
        const total  = this.get('_totalEarned') || this.store.createRecord('money', { base: 'jpy' });
        const exchangeRatesService = this.exchangeRatesService;
        const amount =
                Number(this.get('profit.amount')) -
                Number(this.get('buymaCut.amount')) -
                this.get('soldArticle.shippingServices').reduce((totalShippingCost, shippingService) => {
                  return totalShippingCost + exchangeRatesService.cad2jpy(shippingService.get('rate.amount'));
                }, 0.0);

        total.set('amount', amount);
        this.set('_totalEarned', total);
        return total;
      }),

      priceMarginPct: computed('soldArticle.soldPrice.amount', function () {
        var soldArticleSoldPrice = this.get('soldArticle.soldPrice');
        if (soldArticleSoldPrice.get('amount') <= 0) {
          return 0.0;
        }
        const soldArticlePrice          = this.get('soldArticle.price');
        const exchangeRatesService      = this.get('exchangeRatesService');
        const soldArticlePriceConverted = exchangeRatesService
          .convertCurrency(
            soldArticleSoldPrice.get('base'),
            soldArticlePrice.get('base'),
            soldArticleSoldPrice.get('amount'));

        const soldArticlePriceAmount = soldArticlePrice.get('amount');
        return Math.round((soldArticlePriceConverted - soldArticlePriceAmount) / soldArticlePriceAmount * 100);
      }),

      actions: {
        '_saveSoldArticle'() {
          return this.get('soldArticle').save();
        },

        '_deleteSoldArticle'() {
          return Ember.RSVP.resolve();
        },

        '_assignSelectShippingService'(shippingService, shippingServiceId) {
          this.set('selectShippingService', shippingService);
        },

        '_addShippingService'() {
          var shippingService = this.get('selectShippingService');
          Ember.assert('Must have a valid shipping service', !!shippingService);
          var soldArticle = this.get('soldArticle');
          soldArticle.get('shippingServices').pushObject(shippingService);
          return Ember.RSVP.resolve();
        }
      }
    });
  }
});
