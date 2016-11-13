import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name:         attr(),
  price:        attr('currency', { country: 'CAN' }),
  link:         attr('uri'),
  description:  attr(),
  priceHistory: attr('price-history'),
  createdAt:    attr('datetime'),
  updatedAt:    attr('datetime'),
});
