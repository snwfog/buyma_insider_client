import Ember from "ember";

export default Ember.Route.extend({
  model() {
    return this.modelFor('articles');
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
  }
});
