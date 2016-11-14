import Ember from "ember";

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model(params) {
    // If we pass {{#link-to 'articles' article}} to
    // link-to and to the route, then Ember do not
    // call adapter again to refetch the model
    // If we pass id, then it will automatically
    // call adapter to refetch.
    return hash({
      article: this.store.find('article', params[ 'article_id' ])
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
  }
});
