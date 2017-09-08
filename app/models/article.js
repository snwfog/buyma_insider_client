import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';
import array from 'ember-awesome-macros/array';
import moment from 'moment';
import { momentAsc } from '../lib/moment-comparable-shim';

const { attr, belongsTo, hasMany } = DS;
const { computed } = Ember;

const { IS_NEW_DAYS,
        SYNC_HEALTH: { NEWEST_DAYS, VERY_FRESH_DAYS, FRESH_DAYS, } } = config.MODEL.ARTICLES;

export default DS.Model.extend({
  articleRelateds: hasMany('article',    { async: true }),
  merchant:        belongsTo('merchant', { async: true, inverse: 'articles' }),

  name:            attr(),
  price:           attr('money', { code: 'cad' }),
  link:            attr('uri'),
  description:     attr(),
  priceHistory:    attr('price-history'),
  priceSummary:    attr('price-summary'),

  syncedAt:     attr('datetime'),
  createdAt:    attr('datetime'),
  updatedAt:    attr('datetime'),

  // computed
  isNew: computed('createdAt', function() {
    let refreshDeadline = this.get('createdAt').add(IS_NEW_DAYS, 'days');
    return moment().isBefore(refreshDeadline);
  }),

  health: computed('syncedAt', function() {
    const syncedAt = this.get('syncedAt');
    if (!syncedAt) { return -1; }
    const now = moment(); // local time now
    const diffDays = now.diff(syncedAt, 'days');
    if (diffDays < 0) {
      return -1;
    } else if (diffDays <= NEWEST_DAYS) {
      return 1;
    } else if (diffDays <= VERY_FRESH_DAYS) {
      return 2;
    } else if (diffDays <= FRESH_DAYS) {
      return 3;
    } else {
      return 4;
    }
  }),

  sortedPriceHistory: array.sort('priceHistory', momentAsc),
});
