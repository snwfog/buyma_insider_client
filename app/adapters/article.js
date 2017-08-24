import DS from 'ember-data';
import config from '../config/environment';

import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  query(store, type, query) {
    return this._super(...arguments);
  },

  buildURL(modelName, id, snapshot, requestType, query) {
    return this._super(...arguments);
  },

  urlForQuery(query, modelName) {
    if (!!query.merchant_id) {
      let merchant_id = query.merchant_id;
      delete query.merchant_id;
      return this._buildURL(`merchants/${merchant_id}/articles`);
    } else {
      return this._super(...arguments);
    }
  },

  urlForFindHasMany(id, modelName, snapshot) {
    return this._super(...arguments);
  },
});