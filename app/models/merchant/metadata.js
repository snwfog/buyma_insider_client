import Em from 'ember';
import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name:               attr(),
  baseUrl:            attr(),
  pagerCss:           attr(),
  itemCss:            attr(),
  indexPages:         attr('array'),
  totalArticlesCount: attr('number', { defaultValue: '-' }),
  newArticlesCount:   attr('number', { defaultValue: '-' }),
  lastSync:           attr('datetime')
});
