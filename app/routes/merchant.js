import Ember from 'ember';

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  titleToken({ merchant }) {
    return merchant.get('name');
  },
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

  // beforeModel(transition) { return this._super(...arguments); },
  // getModel() {},

  model(params) {
    return hash({
      merchant: this.store.findRecord('merchant', params['merchant_id'])
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  }
});
