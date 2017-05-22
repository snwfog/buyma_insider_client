import DS from "ember-data";

const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  user:      belongsTo('user', { async: true }),
  createdAt: attr('datetime'),
  updatedAt: attr('datetime')
});
