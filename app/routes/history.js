import Ember from 'ember';

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
//  deserialize(params, transition) {
//    var merchantId = params['merchant_metadata_id']
//    delete params['merchant_metadata_id'];
//    params['merchant/metadata'] = merchantId;
//    this._super(params, transition);
//  },

  // INFO: General rule for customizing url segment
  // 1. Force to set deserialize hook to null (new ember 2.7+?)
  // 2. Use :id instead of object
  deserialize: null,

//  beforeModel(transition) {},
//  getModel() {},

  model(params, transition) {
    return hash({
      metadata: this.store.find('merchant/metadata', params['merchant_metadata_id'])
    });
  },

  renderTemplate(ctrl, model) {
    this.render('history', {
      into: 'application',
    });
  },
});
