import Ember from 'ember';
import config from "../../../config/environment";
import ExtraTariff from '../../../models/extra-tariff';
import UserArticleSold from "../../../models/user/article-sold";

const { APP: { saleTaxPct, buymaCutPct } } = config;
const { A,
        assert,
        assign,
        computed,
        RSVP: { hash },
        Logger: { info } } = Ember;

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

  allShippingServices:             computed(function () {
    return this.store.peekAll('shippingService');
  }).readOnly(),
  selectShippingService:           null,
  articleSoldShippingServiceIds:   computed.mapBy('articleSold.shippingServices', 'id'),
  calculatedTotalShippingServices: computed('articleSold.shippingServices.[]', function () {
    return this
      .getWithDefault('articleSold.shippingServices', A())
      .reduce((totalShippingCost, shippingService) => {
        return totalShippingCost + shippingService.get('rate.amount');
      }, 0.0);
  }),

  allExtraTariffs:             computed(function () {
    return this.store.peekAll('extraTariff');
  }).readOnly(),
  selectExtraTariffs:          null,
  calculatedTotalExtraTariffs: computed('articleSold.extraTariffs.[]', function () {
    return this
      .getWithDefault('articleSold.extraTariffs', A())
      .reduce((totalExtraTariffs, extraTariff) => {
        return totalExtraTariffs + extraTariff.get('_computedRate');
      }, 0.0);
  }),

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
    const articleSoldPriceWithTaxJpy = this.exchangeRatesService.cad2jpy( this.get('articleSoldPriceWithSaleTax.amount'));
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
  totalEarned:  computed('profit.amount', 'buymaCut.amount',
    'calculatedTotalShippingServices', 'calculatedTotalExtraTariffs', function () {
      let total  = this.get('_totalEarned') || this.store.createRecord('money', { base: 'jpy' });
      let amount = Number(this.get('profit.amount'))
                   - Number(this.get('buymaCut.amount'));

      let extraTariffs = this.get('calculatedTotalExtraTariffs');
      let totalShippings = this.get('calculatedTotalShippingServices');
      // Use jpy
      amount += this.exchangeRatesService.cad2jpy(- totalShippings + extraTariffs)
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

  buyerFirstName:    computed.alias('model.articleSold.buyer.firstName'),
  buyerLastName:     computed.alias('model.articleSold.buyer.lastName'),
  buyerEmailAddress: computed.alias('model.articleSold.buyer.emailAddress'),

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
      let shippingService = this.get('selectShippingService');
      assert('Must have a valid shipping service', !!shippingService);
      let articleSold = this.get('articleSold');
      articleSold.get('shippingServices').pushObject(shippingService);
      this.set('selectShippingService', null);
      return Ember.RSVP.resolve();
    },

    '_removeShippingService'(shippingService) {
      this.get('articleSold.shippingServices').removeObject(shippingService);
    },

    '_assignSelectExtraTariffs'(extraTariff, extraTariffId) {
      let articleSold = this.get('articleSold');
      assert('Must have an articleSold', !!this.get('articleSold'));
      extraTariff.set('articleSold', this.get('articleSold'));
      this.set('selectExtraTariff', extraTariff);
    },

    '_addExtraTariff'() {
      let extraTariff = this.get('selectExtraTariff');
      assert('Must have a valid extra tariff', !!extraTariff);
      this.get('articleSold.extraTariffs').pushObject(extraTariff);
      this.set('selectExtraTariff', null);
      return Ember.RSVP.resolve();
    },

    '_removeExtraTariff'(extraTariff) {
      this.debug('TODO: Remove extra tariff');
      extraTariff.set('articleSold', null);
    },

    '_setBuyer'() {
      let {
            buyerEmailAddress,
            buyerFirstName,
            buyerLastName
          }            = this.getProperties('buyerEmailAddress buyerFirstName buyerLastName'.w());
      let articleSold  = this.get('model.articleSold');
      let currentBuyer = this.get('model.articleSold.buyer');
      if (currentBuyer) {
        info('There is currently a buyer associated with this article.');
      }

      let buyer = this.store.createRecord('buyer', {
        articleSold,
        firstName:    buyerFirstName,
        lastName:     buyerLastName,
        emailAddress: buyerEmailAddress });

      articleSold.set('buyer', buyer);
      return articleSold.save();
    },

    '_saveNotes'() {
      this.send('_saveArticleSold');
    },
  }
});
