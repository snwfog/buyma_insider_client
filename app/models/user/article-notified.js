import Ember from "ember";
import DS from "ember-data";

const { computed }                 = Ember;
const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  user:                 belongsTo('user'),
  article:              belongsTo('article'),
  notificationCriteria: hasMany('article/notificationCriterium'),
  readAt:               attr('datetime'),
  createdAt:            attr('datetime'),
  updatedAt:            attr('datetime'),
  'read?':              computed.notEmpty('readAt'),
});
