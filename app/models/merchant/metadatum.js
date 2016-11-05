import DS from 'ember-data';

const { hasMany, attr } = DS;

export default DS.Model.extend({
  crawlSessions:      hasMany('merchant/crawlSession', { async: true }),

  name:               attr(),
  baseUrl:            attr(),
  pagerCss:           attr(),
  itemCss:            attr(),
  indexPages:         attr('array'),
  totalArticlesCount: attr('number', { defaultValue: '-' }),
  newArticlesCount:   attr('number', { defaultValue: '-' }),
  lastSync:           attr('datetime')
});
