import DS from 'ember-data';

const { attr } = DS;
export default DS.Model.extend({
  date:  attr('datetime'),
  price: attr('currency'),
});
