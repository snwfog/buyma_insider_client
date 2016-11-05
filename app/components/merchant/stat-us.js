import Ember from 'ember';

let { computed }            = Ember;
let MerchantStatusComponent = Ember.Component.extend({
  merchantMetadatum: null,
  metadatum:         computed.alias('merchantMetadatum'),
  meta:              computed.alias('merchantMetadatum'),
  lastSyncedDate:    computed(() => `${Math.ceil(Math.random() * 10)} days ago`),
});

MerchantStatusComponent.reopenClass({
  positionalParams: 'merchantMetadatum'.w(),
});

export default MerchantStatusComponent;