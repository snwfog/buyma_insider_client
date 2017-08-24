import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  pathForType: () => 'exchange_rates',

  urlForQueryRecord(query, modelName) {
    let url = this._super(...arguments);
    if (query._latest) {
      delete query._latest;
      url = `${url}/latest`
    }

    return url;
  }
});
