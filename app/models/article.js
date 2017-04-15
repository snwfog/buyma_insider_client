import DS from "ember-data";

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  priceHistory: belongsTo('article/price-history', { async: false }),

  name:         attr(),
  price:        attr('money', { code: 'cad' }),
  link:         attr('uri'),
  description:  attr(),

  priceSummary: attr('price-summary'),

  createdAt:    attr('datetime'),
  updatedAt:    attr('datetime'),
});
