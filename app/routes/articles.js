import Ember from "ember";

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  setupController(controller, models) {
//     controller.setProperties(models);
    return this._super(...arguments);
  }
});
