import DS from "ember-data";

const { hasMany, belongsTo, attr } = DS;

// Used for persistence
export default DS.Model.extend({
  articleWatched:        belongsTo('user/article-watched'),
  notificationCriterium: belongsTo('article/notification-criterium'),
});
