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
});
