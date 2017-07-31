import Ember from 'ember';

const { getWithDefault } = Ember;

export default Ember.Route.extend({
  model(params, transition) {
    this.debug(params);
    return this._super(...arguments);
  },

  // has controller
//  setupController(controller, models, transition) {
//    controller.reopen({
//      year: get(transition.queryParams, 'year'),
//    });
//
//    return this._super(...arguments);
//  }
});
