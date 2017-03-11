import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  modelNameFromPayloadKey(payloadKey) {
//    payloadKey = payloadKey.split('_').join('/')
//    this.debug(`modelnameFromPayloadKey ${payloadKey}`);
    if (payloadKey === 'merchant-metadata') {
      return 'merchant/metadatum';
    } else if (payloadKey === 'crawl-sessions') {
      return 'merchant/crawlSession';
    } else {
      return this._super(payloadKey);
    }
  },

  payloadKeyFromModelName(key) {
    var pluralizeKey = this._super(...arguments);
    // TODO: This do for now, but probably should be more sophisticated
    // info(`payloadKeyFromModelName ${key}`);
    return pluralizeKey.split('/').join('_');
  },
});
