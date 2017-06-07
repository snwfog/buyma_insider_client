import Ember from "ember";

const { log, info, warn, error, debug } = Ember.Logger;

export default Ember.Route.extend({
  beforeModel(transition) {
    if (!!this.currentUser) {
      info(`Already logged in [${this.currentUser.get('username')}]`);
      info(`Transition intended for: ${transition.targetName}`);
      transition.abort();
      this.replaceWith('index');
    }
  },

  // has controller
  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  },

});
