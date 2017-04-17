import DS from "ember-data";

const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  login:     attr(),
  password:  attr(),
  createdAt: attr('datetime'),
  updatedAt: attr('datetime')
});