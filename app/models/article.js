import DS from "ember-data";

const { attr } = DS;

export default DS.Model.extend({
  name:         attr(),
  price:        attr('money', { code: 'cad' }),
  link:         attr('uri'),
  description:  attr(),
  priceHistory: attr('price-history'),
  createdAt:    attr('datetime'),
  updatedAt:    attr('datetime'),
});
