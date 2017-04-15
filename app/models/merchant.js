import DS from "ember-data";

const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  crawlSessions:      hasMany('merchant/crawl-session', { async: true }),
  indexPages:         hasMany('merchant/index-page',    { async: true}),
  articles:           hasMany('articles',               { async: true}),
  metadatum:          belongsTo('merchant/metadatum',   { async: false }),

  name:               attr(),
  totalArticlesCount: attr('number'),
  lastSyncAt:         attr('datetime')
});
