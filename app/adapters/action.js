import ApplicationAdapter from './application';

// Map all `action` to server backend endpoint
export default ApplicationAdapter.extend({
  pathForType: (modelName) => modelName,
    // var dict = {
    //   'action/index-page/-refresh': `index-page/${snapshot.record.get('indexPage.id')}/_refresh`,
    // };
    // var endpoint = dict[ modelName ];
    // return this._super(modelName);

  urlForCreateRecord(modelName, snapshot) {
    var dict = {
      'action/index-page/-refresh': `index_pages/${snapshot.record.get('indexPage.id')}/_refresh`
    };

    var endpoint = dict[ modelName ];
    return this._super(endpoint, snapshot);
  }
});
