import Ember from "ember";
import DS from "ember-data";

import moment from "moment";

const { attr, belongsTo, hasMany } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  priceHistory:    belongsTo('article/price-history', { async: false }),
  articleRelateds: hasMany('article', { async: true }),

  name:         attr(),
  price:        attr('money', { code: 'cad' }),
  link:         attr('uri'),
  description:  attr(),

  priceSummary: attr('price-summary'),

  syncedAt:     attr('datetime'),
  createdAt:    attr('datetime'),
  updatedAt:    attr('datetime'),

  // computed
  health: computed('syncedAt', function() {
    const syncedAt = this.get('syncedAt');
    if (!syncedAt) { return -1; }
    const now = moment(); // local time now
    const diffDays = now.diff(syncedAt, 'days');
    if (diffDays < 0) {
      return -1;
    } else if (diffDays <= 1) {
      return 1;
    } else if (diffDays <= 7) {
      return 2;
    } else if (diffDays <= 30) {
      return 3;
    } else {
      return 4;
    }
  }),
});
