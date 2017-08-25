import ApplicationAdapter from './application';

// Map all `action` to server backend endpoint
export default ApplicationAdapter.extend({
  pathForType: (modelName) => modelName,
  // var dict = {
  //   'action/index-pages/-refresh': `index-pages/${snapshot.record.get('indexPage.id')}/_refresh`,
  // };
  // var endpoint = dict[ modelName ];
  // return this._super(modelName);

  urlForCreateRecord(modelName, snapshot) {
    let dict = {
      'action/index-pages/-refresh':         `index_pages/${snapshot.record.get('indexPage.id')}/_refresh`,
      'action/merchants/-groom-index-pages': `merchants/${snapshot.record.get('merchant.id')}/_groom_index_pages`
    };

    let endpoint = dict[ modelName ];
    return this._super(endpoint, snapshot);
  }
});
