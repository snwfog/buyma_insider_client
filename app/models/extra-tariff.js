import DS from 'ember-data';

const { computed } = Ember;
const { belongsTo, attr } = DS;

export default DS.Model.extend({
  soldArticle:    belongsTo('user/article-sold'),
  name:           attr(),
  rate:           attr(),
  rateType:       attr({ defaultValue: 'flat' }),
  floatDirection: attr({ defaultValue: 'out' }),
  description:    attr(),

  // computed
  isInFlow:      computed.equal('floatDirection', 'in'),
  isOutFlow:     computed.equal('floatDirection', 'out'),
  isFlatRate:    computed.equal('rateType', 'flat'),
  isPercentRate: computed.equal('rateType', 'percent'),
  shortSummary:  computed(function () {
    let signDisplay = this.get('floatDirection') === 'in' ? '+' : '-';
    let rate        = this.get('rate');
    let rateDisplay = this.get('rateType') === 'flat' ? rate + '$' : rate + '%';
    return `${signDisplay}${rateDisplay}`;
  }),
});
