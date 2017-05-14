import ApplicationAdapter from "../application";

export default ApplicationAdapter.extend({
  pathForType(modelName) {
    return modelName;
  },

  buildURL(modelName, id, snapshot, requestType, query) {
    modelName = `articles/${snapshot.record.get('article.id')}/watch`;
    return this._super(modelName, id, snapshot, requestType, query);
  },

  urlForDeleteRecord(id, modelName, snapshot) {
    modelName = `articles/${snapshot.record.get('article.id')}/watch`;
    return this._super(null, modelName, snapshot);
  },

  urlForUpdateRecord(id, modelName, snapshot) {
    modelName = 'user_article_watcheds';
    return this._super(id, modelName, snapshot);
  }
});
