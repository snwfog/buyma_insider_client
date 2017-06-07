import Ember from "ember";
const { A, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  beforeModel(transition) {
    if (!this.currentUser) {
      transition.abort();
      this.transitionTo('index.hello');
    }
  },

  model() {
    return hash({
      articleSolds: (this.get('currentUser.articleSolds') || A()),
    });
  },

  // has controller
  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  }
});
