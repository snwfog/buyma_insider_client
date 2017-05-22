import Ember from "ember";

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    const currentUser   = this.currentUser;
    var dashboardModels = {};
    if (!!currentUser) {
      dashboardModels.articleSolds = currentUser.get('articleSolds');
    }

    return hash(dashboardModels);
  },

  // has controller
  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  }
});
