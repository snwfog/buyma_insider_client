import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({
  pathForType: (modelName) => modelName,

  urlForUpdateRecord(id, modelName, snapshot) {
    modelName = 'user_article_notifieds';
    return this._super(id, modelName, snapshot);
  }
});