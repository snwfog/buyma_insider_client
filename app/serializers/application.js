import Em from 'ember';
import DS from 'ember-data';

const { debug } = Em;

export default DS.JSONAPISerializer.extend({
  modelNameFromPayloadKey(payloadKey) {
//    payloadKey = payloadKey.split('_').join('/')
//    debug(`modelnameFromPayloadKey ${payloadKey}`);
    if (payloadKey === 'merchant-metadata') {
      return 'merchant/metadata';
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
