import Ember from "ember";

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  setupController(controller, models) {
    this._super(...arguments);
//     controller.setProperties(models);
  }
});
