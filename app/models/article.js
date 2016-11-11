import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
//  priceHistory:  hasMany('priceHistory', { async: false }),
  name:          attr(),
  price:         attr('currency', { country: 'CAN' }),
  link:          attr('uri'),
  description:   attr(),
//  price_history: attr('map'),
});
