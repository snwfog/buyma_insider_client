import DS from 'ember-data';
import config from '../config/environment';

const { log, info, warn, error, debug } = Ember.Logger;

export default DS.JSONAPIAdapter.extend({
  namespace: config.APP.SERVER.namespace,
  host:      config.APP.SERVER.endpoint,

  handleResponse(status, headers, payload, requestData) {
    const handledResponse = this._super(...arguments);
    if (handledResponse instanceof DS.UnauthorizedError) {
      error('ERROR: Not authorized.');
    }

    return handledResponse;
  }
});
