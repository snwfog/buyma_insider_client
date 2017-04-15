import DS from "ember-data";

const { attr, belongsTo } = DS;
export default DS.Model.extend({
  article:  belongsTo('article'),

  currency: attr('currency', { defaultValue: 'can' }),
  history:  attr('priceList')
});
