import Ember from 'ember';
import config from "../../../config/environment";
import UserArticleSold from "../../../models/user/article-sold";

const { APP: { saleTaxPct, buymaCutPct } }     = config;
const { assign, computed, RSVP: { hash } } = Ember;

export default Ember.Controller.extend({
  allowEditArticleSoldPrice: false,

  articleSoldStatuses: computed(function () {
    const statuses    = Ember.copy(UserArticleSold.STATUS);
    const articleSold = this.get('articleSold');
    return Object.keys(statuses).reduce((memoStatus, status) => {
      memoStatus[ status ] = articleSold.get(`${status}At`);
      return memoStatus;
    }, statuses);
  }),

  allShippingServices: computed(function() {
    return this.store.peekAll('shippingService');
  }).readOnly(),

  selectShippingService:         null,
  articleSoldShippingServiceIds: computed.mapBy('articleSoldShippingServices', 'id'),
  articleSoldShippingServices:   computed('model.articleSold.shippingServices.[]', function() {
    return this.get('articleSold.shippingServices');
  }).readOnly(),

  // Article price-balance sheet variable
  articleSoldPrice: computed('articleSold.price.amount', function () {
    return this.exchangeRatesService.cad2jpy(this.get('articleSold.price.amount'));
  }),

  articleSoldSoldPrice: computed.alias('articleSold.soldPrice.amount'),

  saleTaxPct:                   computed(() => saleTaxPct),
  _articleSoldPriceWithSaleTax: null,
  articleSoldPriceWithSaleTax:  computed('articleSold.price.amount', function () {
    const articleSoldPriceWithSaleTax = this.get('_articleSoldPriceWithSaleTax') || this.store.createRecord('money', { base: 'cad' });
    const articleSoldPrice            = this.get('articleSold.price.amount');
    articleSoldPriceWithSaleTax.set('amount', articleSoldPrice * (1 + saleTaxPct / 100));
    this.set('_articleSoldPriceWithSaleTax', articleSoldPriceWithSaleTax);
    return articleSoldPriceWithSaleTax;
  }),

  _profit: null,
  profit:  computed('articleSoldPriceWithSaleTax.amount', 'articleSoldSoldPrice', function () {
    const profit                     = this.get('_profit') || this.store.createRecord('money', { base: 'jpy' });
    const articleSoldPriceWithTaxJpy = this.exchangeRatesService.convertCurrency(
      'cad', 'jpy', this.get('articleSoldPriceWithSaleTax.amount'));
    profit.set('amount', -Number(articleSoldPriceWithTaxJpy) + Number(this.get('articleSoldSoldPrice')));
    this.set('_profit', profit);
    return profit;
  }),

  buymaCutPct: computed(() => buymaCutPct),
  _buymaCut:   null,
  buymaCut:    computed('articleSoldSoldPrice', function () {
    const buymaCut = this.get('_buymaCut') || this.store.createRecord('money', { base: 'jpy' });
    buymaCut.set('amount', Number(this.get('articleSoldSoldPrice')) * (buymaCutPct / 100));
    this.set('_buymaCut', buymaCut);
    return buymaCut;
  }),

  _totalEarned: null,
  totalEarned:  computed('profit.amount', 'buymaCut.amount', 'articleSold.shippingServices.[]', function () {
    const total  = this.get('_totalEarned') || this.store.createRecord('money', { base: 'jpy' });
    const exchangeRatesService = this.exchangeRatesService;
    const amount =
            Number(this.get('profit.amount')) -
            Number(this.get('buymaCut.amount')) -
            this.get('articleSold.shippingServices').reduce((totalShippingCost, shippingService) => {
              return totalShippingCost + exchangeRatesService.cad2jpy(shippingService.get('rate.amount'));
            }, 0.0);

    total.set('amount', amount);
    this.set('_totalEarned', total);
    return total;
  }),

  priceMarginPct: computed('articleSold.soldPrice.amount', function () {
    var articleSoldSoldPrice = this.get('articleSold.soldPrice');
    if (articleSoldSoldPrice.get('amount') <= 0) {
      return 0.0;
    }
    const articleSoldPrice          = this.get('articleSold.price');
    const exchangeRatesService      = this.get('exchangeRatesService');
    const articleSoldPriceConverted = exchangeRatesService
      .convertCurrency(
        articleSoldSoldPrice.get('base'),
        articleSoldPrice.get('base'),
        articleSoldSoldPrice.get('amount'));

    const articleSoldPriceAmount = articleSoldPrice.get('amount');
    return Math.round((articleSoldPriceConverted - articleSoldPriceAmount) / articleSoldPriceAmount * 100);
  }),

  actions: {
    '_saveArticleSold'() {
      const currentUser = this.currentUser;
      const articleSold = this.get('articleSold');
      articleSold.setProperties({ user: currentUser });
      return articleSold.save();
    },

    '_deleteArticleSold'() {
      return this.get('articleSold').destroyRecord();
    },

    '_assignSelectShippingService'(shippingService, shippingServiceId) {
      this.set('selectShippingService', shippingService);
    },

    '_addShippingService'() {
      var shippingService = this.get('selectShippingService');
      Ember.assert('Must have a valid shipping service', !!shippingService);
      var articleSold = this.get('articleSold');
      articleSold.get('shippingServices').pushObject(shippingService);
      this.set('selectShippingService', null);
      return Ember.RSVP.resolve();
    },

    '_removeShippingService'(shippingService) {
      this.get('articleSold.shippingServices').removeObject(shippingService);
    }
  }
});
