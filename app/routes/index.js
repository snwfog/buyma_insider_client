import Ember from "ember";
import config from "../config/environment";

const { hash }     = Ember.RSVP;
const { computed } = Ember;

export default Ember.Route.extend({
  model() {
    var { merchants } = this.modelFor('application');
    return hash({ merchants });
  },

  // has controller
  setupController(controller, models) {
    this._super(...arguments);
    controller.set('appName', config.appName);
    controller.setProperties(models);
  },
});
