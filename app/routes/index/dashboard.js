import Ember from 'ember';
const { A, RSVP: { hash } } = Ember;
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  titleToken(models) {
    return 'dashboard';
  },

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
