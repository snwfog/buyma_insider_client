import Ember from 'ember';
import config from '../config/environment';

const { hash }     = Ember.RSVP;
const { computed } = Ember;

export default Ember.Route.extend({
  model() {
    let { merchants } = this.modelFor('application');
    return hash({ merchants });
  },

  // has controller
  setupController(controller, models) {
    controller.set('appName', config.appName);
    controller.setProperties(models);
    return this._super(...arguments);
  },
});
