import Ember from "ember";

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    const currentUser = this.currentUser;
    return hash({
      articleSolds: currentUser.get('articleSolds'),
    });
  },

  // has controller
  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  }
});
