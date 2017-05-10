import Ember from 'ember';

// has controller
export default Ember.Route.extend({
  model(params, transition) {
    return this._super(...arguments);
  }
});
