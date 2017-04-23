import Ember from "ember";
import DS from "ember-data";

const { computed } = Ember;
const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  user:         belongsTo('user'),
  article:      belongsTo('article'),
  exchangeRate: belongsTo('exchange-rate'),
  createdAt:    attr('datetime'),
  updatedAt:    attr('datetime'),

  // TODO: Backend article price should be saved
  soldPrice:    computed(function() {
    return this.get('article.price');
  }),
});
