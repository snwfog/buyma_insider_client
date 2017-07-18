import Ember from "ember";

const { assign, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  titleToken({ article }) {
    return article.get('name');
  },

  model(params) {
    // If we pass {{#link-to 'articles' article}} to
    // link-to and to the route, then Ember do not
    // call adapter again to refetch the model
    // If we pass id, then it will automatically
    // call adapter to refetch.
    const models            = {};
    const applicationModels = this.modelFor('application');
    const article           = this.store.findRecord('article', params[ 'article_id' ]);
    assign(models, applicationModels, { article, });
    return hash(models);
  },

  // has controller
  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  }
});
