import Ember from "ember";
import DS from "ember-data";

const { computed }                 = Ember;
const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  user:                 belongsTo('user'),
  article:              belongsTo('article',                     { async: false }),
  notificationCriteria: hasMany('article/notificationCriterium', { async: false }),
  readAt:               attr('datetime'),
  createdAt:            attr('datetime'),
  updatedAt:            attr('datetime'),
  isRead:               computed.notEmpty('readAt'),
});
