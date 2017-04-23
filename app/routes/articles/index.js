import Ember from "ember";

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    const articlesModels    = this.modelFor('articles');
    const applicationModels = this.modelFor('application');
    return hash(Ember.merge(applicationModels, articlesModels));
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
  }
});
