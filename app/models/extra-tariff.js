import DS from 'ember-data';

const { belongsTo, attr } = DS;

export default DS.Model.extend({
  soldArticle:    belongsTo('user/article-sold'),
  name:           attr(),
  rate:           attr(),
  rateType:       attr({ defaultValue: 'flat' }),
  floatDirection: attr({ defaultValue: 'out' }),
  description:    attr(),
});
