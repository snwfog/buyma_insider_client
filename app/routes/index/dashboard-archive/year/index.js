import Ember from 'ember';

// has controller
export default Ember.Route.extend({
  model(params, transition) {
    this.debug(params);
    return this._super(...arguments);
  }
});
