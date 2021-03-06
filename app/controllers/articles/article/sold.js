import Ember from 'ember';
import config from '../../../config/environment';
import UserArticleSold from '../../../models/user/article-sold';

const { APP: { CAD_SALES_TAX_PCT, BUYMA_CUT_PCT } } = config;
const { A,
        assert,
        assign,
        computed,
        RSVP: { hash },
        Logger: { info } } = Ember;

export default Ember.Controller.extend({
  allowEditArticleSoldPrice: false,

  selectAutoProfitMargin: null,
  autoProfitMargins: computed('totalCost', function() {
    let rates = [
      { rate: 10, message: 'What a conservative' },
      { rate: 20, message: 'I\'d say its quite decent' },
      { rate: 30, message: 'Now you got my attention' },
      { rate: 40, message: 'They see me rollin\', they hatin\'' },
      { rate: 50, message: 'They see me rollin\', they hatin\'' },
      { rate: 60, message: 'They see me rollin\', they hatin\'' },
      { rate: 70, message: 'They see me rollin\', they hatin\'' },
      { rate: 80, message: 'They see me rollin\', they hatin\'' },
      { rate: 90, message: 'They see me rollin\', they hatin\'' },
      { rate: 100, message: 'Woah woah' } ]; // Percent

    let totalCost = this.get('totalCost');
    return rates.map((marginRate) => {
      marginRate[ 'profitMoney' ] = this.store.createRecord('money', {
        base:   config.APP.CURRENCIES.JPY,
        amount: this.exchangeRatesService.cad2jpy(totalCost * marginRate.rate / 100).toFixed(),
      });

      return marginRate;
    });
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

  articleSoldPriceSold: computed.alias('articleSold.priceSold.amount'),

  saleTaxPct:                   CAD_SALES_TAX_PCT,
  _articleSoldPriceWithSaleTax: null,
  articleSoldPriceWithSaleTax:  computed('articleSold.price.amount', function () {
    const articleSoldPriceWithSaleTax = this.get('_articleSoldPriceWithSaleTax') || this.store.createRecord('money', { base: 'cad' });
    const articleSoldPrice            = this.get('articleSold.price.amount');
    articleSoldPriceWithSaleTax.set('amount', articleSoldPrice * (1 + CAD_SALES_TAX_PCT / 100));
    this.set('_articleSoldPriceWithSaleTax', articleSoldPriceWithSaleTax);
    return articleSoldPriceWithSaleTax;
  }),

  _profit: null,
  profit:  computed('articleSoldPriceWithSaleTax.amount', 'articleSoldPriceSold', function () {
    const profit                     = this.get('_profit') || this.store.createRecord('money', { base: 'jpy' });
    const articleSoldPriceWithTaxJpy = this.exchangeRatesService.cad2jpy( this.get('articleSoldPriceWithSaleTax.amount'));
    profit.set('amount', -Number(articleSoldPriceWithTaxJpy) + Number(this.get('articleSoldPriceSold')));
    this.set('_profit', profit);
    return profit;
  }),

  buymaCutPct:   BUYMA_CUT_PCT,
  _buymaCut:     null,
  buymaCut:      computed('articleSoldPriceSold', function () {
    const buymaCut = this.get('_buymaCut') || this.store.createRecord('money', { base: 'jpy' });
    buymaCut.set('amount', Number(this.get('articleSoldPriceSold')) * (BUYMA_CUT_PCT / 100));
    this.set('_buymaCut', buymaCut);
    return buymaCut;
  }),

  _totalEarned: null,
  totalEarned:  computed('profit.amount', 'buymaCut.amount', 'calculatedTotalShippingServices', 'calculatedTotalExtraTariffs', function () {
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

  totalCost: computed('articleSoldPriceWithSaleTax.amount', 'buymaCut.amount', 'calculatedTotalShippingServices', 'calculatedTotalExtraTariffs', function() {
    let articleSoldPriceWithSaleTax = this.get('articleSoldPriceWithSaleTax.amount');
    let buymaCut = this.exchangeRatesService.jpy2cad(this.get('buymaCut.amount'));
    let calculatedTotalShippingServices = this.get('calculatedTotalShippingServices');
    let calculatedTotalExtraTariffs = this.get('calculatedTotalExtraTariffs');

    return articleSoldPriceWithSaleTax + buymaCut + calculatedTotalShippingServices + calculatedTotalExtraTariffs;
  }),

  priceMarginPct: computed('articleSold.priceSold.amount', function () {
    let articleSoldPriceSold = this.get('articleSold.priceSold');
    if (articleSoldPriceSold.get('amount') <= 0) {
      return 0.0;
    }
    const articleSoldPrice          = this.get('articleSold.price');
    const exchangeRatesService      = this.get('exchangeRatesService');
    const articleSoldPriceConverted = exchangeRatesService
      .convertCurrency(
        articleSoldPriceSold.get('base'),
        articleSoldPrice.get('base'),
        articleSoldPriceSold.get('amount'));

    const articleSoldPriceAmount = articleSoldPrice.get('amount');
    return Math.round((articleSoldPriceConverted - articleSoldPriceAmount) / articleSoldPriceAmount * 100);
  }),

  buyerFirstName:    computed.alias('articleSold.buyer.firstName'),
  buyerLastName:     computed.alias('articleSold.buyer.lastName'),
  buyerEmailAddress: computed.alias('articleSold.buyer.emailAddress'),

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

    '_assignSelectAutoProfitMargin'(autoProfitMargin) {
      this.set('selectedAutoProfitMargin', autoProfitMargin);
      let totalCost         = this.get('totalCost');
      let adjustedPriceSold = totalCost * (1 + autoProfitMargin.rate / 100.0);
      this.set('articleSold.priceSold.amount',
        this.exchangeRatesService.cad2jpy(adjustedPriceSold).toFixed()); // Crude rounding
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

    '_setArticleSoldStatus'(status) {
      this.set('articleSold.status', status);
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
