import Ember from 'ember';

const { hash }  = Ember.RSVP;
const { alias } = Ember.computed;

export default Ember.Route.extend({
  model() {
    let { merchant } = this.modelFor('merchant');
    return hash({
      merchant,
    });
  },

  // has controller
  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  }
});
