import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  setupController(controller) {
    this._super(...arguments);
    controller.set('appName', config.appName);
  }
});
