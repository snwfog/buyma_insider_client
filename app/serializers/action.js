import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    indexPage: { serialize: false }
  },

  payloadKeyFromModelName(key) {
    // var pluralizeKey = this._super(...arguments);
    // TODO: This do for now, but probably should be more sophisticated
    // info(`payloadKeyFromModelName ${key}`);
    return key.split(/[^A-z_]/).join('_')
  },

  modelNameFromPayloadKey(key) {
    let dict = {
      'index_pages_refresh':        'action/index-pages/-refresh',
      'merchant_groom_index_pages': 'action/merchants/-groom-index-pages',
    };

    return !!dict[ key ] ? dict[ key ] : this._super(...arguments);
  }
});
