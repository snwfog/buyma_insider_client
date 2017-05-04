import DS from "ember-data";

const { belongsTo } = DS;

// Used for persistence
export default DS.Model.extend({
  article:         belongsTo('article'),
  shippingService: belongsTo('shippingService'),
});
