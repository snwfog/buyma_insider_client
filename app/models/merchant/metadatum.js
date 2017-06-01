import DS from 'ember-data';

const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  merchant:           belongsTo('merchant'),
  name:               attr(),
  domain:             attr(),
  pagerCss:           attr(),
  itemCss:            attr(),
  indexPages:         attr('array'),
//   newArticlesCount:   attr('number', { defaultValue: '-' }),
});
