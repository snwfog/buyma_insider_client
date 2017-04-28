import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({
  pathForType(modelName) {
    return modelName;
  },

  buildURL(modelName, id, snapshot, requestType, query) {
    modelName = `articles/${snapshot.record.get('article.id')}/sell`;
    return this._super(modelName, id, snapshot, requestType, query);
  },

  urlForDeleteRecord(id, modelName, snapshot) {
    // We can either
    modelName = `articles/${snapshot.record.get('article.id')}/sell`;
    return this._super(null, modelName, snapshot);
    // or
//     modelName = `user_sold_articles/${id}`;
//     return this._super(id, 'user_sold_articles', snapshot);
  },

  urlForFindRecord(id, modelName, snapshot) {
    return this._super(id, 'user_sold_articles', snapshot);
  },

  urlForUpdateRecord(id, modelName, snapshot) {
    return this._super(id, 'user_sold_articles', snapshot);
  }
});
