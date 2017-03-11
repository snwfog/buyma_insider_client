import Ember from "ember";

let { computed }            = Ember;
let MerchantStatusComponent = Ember.Component.extend({
  merchant:       null,
  metadatum:      computed.alias('merchant.metadatum'),
  meta:           computed.alias('merchant.metadatum'),
  lastSyncedDate: computed(() => `${Math.ceil(Math.random() * 10)} days ago`),
});

MerchantStatusComponent.reopenClass({
  positionalParams: 'merchant'.w(),
});

export default MerchantStatusComponent;