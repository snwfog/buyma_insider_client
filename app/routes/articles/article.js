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
    return hash(merge(applicationModels, {
        article: this.store.find('article', params[ 'article_id' ]) }));
  },

  // has controller
  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
  }
});
