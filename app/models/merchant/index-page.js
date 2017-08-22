import Ember from 'ember';
import DS from 'ember-data';

const { computed }                 = Ember;
const { belongsTo, hasMany, attr } = DS;

export default DS.Model.extend({
  indexPages:   hasMany('merchant/index-page', { async: false, inverse: 'indexPage' }),
  indexPage:    belongsTo('merchant/index-page', { async: false, inverse: 'indexPages' }),

  fullUrl:      attr(),
  relativePath: attr(),
  health:       attr(),
  lastSyncedAt: attr('datetime'),

  isRoot: computed.notEmpty('indexPages'),
});
