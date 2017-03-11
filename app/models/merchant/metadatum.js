import DS from 'ember-data';

const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  crawlSessions:      hasMany('merchant/crawlSession', { async: true }),

  merchant:           belongsTo('merchant'),

  name:               attr(),
  baseUrl:            attr(),
  pagerCss:           attr(),
  itemCss:            attr(),
  indexPages:         attr('array'),
//   newArticlesCount:   attr('number', { defaultValue: '-' }),
});
