import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({
  pathForType(modelName) {
    return modelName;
  },

  buildURL(modelName, id, snapshot, requestType, query) {
    modelName = `articles/${snapshot.record.get('article.id')}/watched`;
    return this._super(modelName, id, snapshot, requestType, query);
  }
});
