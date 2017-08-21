import Ember from 'ember';

const { merge, getWithDefault } = Ember;
const { hash }                  = Ember.RSVP;

export default Ember.Route.extend({
  model(params, transition) {
    return this._super(...arguments);
  },

  // has controller
  setupController(controller, models, transition) {
    return this._super(...arguments);
//     var { q } = controller.get('target.router.activeTransition.queryParams');
//     controller.set('inputSearchArticleQuery', q);
  }
});
