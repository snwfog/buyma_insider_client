import Ember from "ember";

const { merge, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  model(params) {
    // If we pass {{#link-to 'articles' article}} to
    // link-to and to the route, then Ember do not
    // call adapter again to refetch the model
    // If we pass id, then it will automatically
    // call adapter to refetch.
    const applicationModels = this.modelFor('application');
    const article           = this.store.findRecord('article', params[ 'article_id' ]);
    return hash(merge(applicationModels, { article, }));
  },

  // has controller
  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  }
});
