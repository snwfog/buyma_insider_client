import Ember from 'ember';
import config from '../config/environment';

const { hash } = Ember.RSVP;
export default Ember.Route.extend({
  model() {
    var { merchantMetadata } = this.modelFor('application');
    return hash({ merchantMetadata });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.set('appName', config.appName);
    controller.setProperties(models);
  }
});
