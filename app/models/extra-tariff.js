import DS from 'ember-data';
import Money from './money';
import config from '../config/environment';

const { computed, assert } = Ember;
const { belongsTo, attr } = DS;

let ExtraTariff = DS.Model.extend({
  soldArticle:    belongsTo('user/article-sold'),
  name:           attr(),
  rate:           attr(),
  rateType:       attr({ defaultValue: 'flat' }),
  floatDirection: attr({ defaultValue: 'out' }),
  description:    attr(),

  // computed
  isInflow:      computed.equal('floatDirection', config.MODEL.EXTRA_TARIFFS.FLOW_DIRECTION.INFLOW),
  isOutflow:     computed.equal('floatDirection', config.MODEL.EXTRA_TARIFFS.FLOW_DIRECTION.OUTFLOW),
  isFlatRate:    computed.equal('rateType', config.MODEL.EXTRA_TARIFFS.RATE_TYPE.FLAT_RATE),
  isPercentRate: computed.equal('rateType', config.MODEL.EXTRA_TARIFFS.RATE_TYPE.PERCENT_RATE),

  computedRateMoney: computed('_computedRate', function() {
    // TODO: This might creates too many money object.
    return this.store.createRecord('money', {
      base: config.APP.CURRENCIES.CAD,
      amount: this.get('_computedRate'),
    })
  }),

  _computedRate: computed('soldArticle', function () {
    let soldArticle            = this.get('soldArticle');
    let soldArticlePrice       = this.get('soldArticle.price');
    let soldArticlePriceAmount = this.get('soldArticle.price.amount');
    let rateOrAmount           = this.get('rate'), amount = 0.0;

    if (!soldArticle) {
      return amount;
    }

    if (this.get('isPercentRate')) {
      amount = soldArticlePriceAmount * rateOrAmount; // percent rate
    } else {
      assert('Sold price must be in CAD', soldArticlePrice.get('isCad'));
      amount = rateOrAmount; // flat rate in cad
    }

    amount *= this.get('isInflow') ? 1 : -1;
    return amount;
  }),

  shortSummary:  computed(function () {
    let signDisplay = this.get('isInflow') ? '+' : '-';
    let rate        = this.get('rate');
    let rateDisplay = this.get('isFlatRate') ? rate + '$' : rate + '%';
    return `${signDisplay}${rateDisplay}`;
  }),
});

ExtraTariff.reopenClass({
  RATE_TYPE:      config.MODEL.EXTRA_TARIFFS.RATE_TYPE,
  FLOW_DIRECTION: config.MODEL.EXTRA_TARIFFS.FLOW_DIRECTION,
});

export default ExtraTariff;
