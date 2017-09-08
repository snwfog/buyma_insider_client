import DS from "ember-data";

const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  articles:           hasMany('article',                { async: true, inverse: 'merchant' }),
  indexPages:         hasMany('merchant/index-page',    { async: true }),
  crawlSessions:      hasMany('merchant/crawl-session', { async: true }),

  metadatum:          belongsTo('merchant/metadatum',   { async: false }),

  name:               attr(),
  totalArticlesCount: attr('number'),
  lastSyncedAt:       attr('datetime')
});
