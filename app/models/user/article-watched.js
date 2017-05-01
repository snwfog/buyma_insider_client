import DS from "ember-data";

const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  user:      belongsTo('user'),
  article:   belongsTo('article'),

  createdAt: attr('datetime'),
  updatedAt: attr('datetime'),
});
