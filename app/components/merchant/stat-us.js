import Ember from 'ember';

let { computed } = Ember;

export default Ember.Component.extend({
  newArticlesCount:   computed(() => Math.round(Math.random() * 500)),
  totalArticlesCount: computed(() => Math.round(Math.random() * 1000)),
  lastSyncedDate:     computed(() => `${Math.ceil(Math.random() * 10)} days ago`),
});
