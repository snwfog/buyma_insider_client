import Ember from 'ember';

let { computed }            = Ember;
let MerchantStatusComponent = Ember.Component.extend({
  merchantMetadata:   null,
  metadata:           computed.alias('merchantMetadata'),
  meta:               computed.alias('merchantMetadata'),
  newArticlesCount:   computed(() => Math.round(Math.random() * 500)),
  totalArticlesCount: computed(() => Math.round(Math.random() * 1000)),
  lastSyncedDate:     computed(() => `${Math.ceil(Math.random() * 10)} days ago`),
});

MerchantStatusComponent.reopenClass({
  positionalParams: 'merchantMetadata'.w(),
});

export default MerchantStatusComponent;