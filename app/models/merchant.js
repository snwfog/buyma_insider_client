import DS from "ember-data";

const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  crawlSessions:      hasMany('merchant/crawlSession', { async: true }),
  metadatum:          belongsTo('merchant/metadatum', { async: false }),

  name:               attr(),
  totalArticlesCount: attr('number', { defaultValue: 0 }),
  lastSyncAt:         attr('datetime')
});
