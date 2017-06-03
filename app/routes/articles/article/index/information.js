import Ember from "ember";

const { assign, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  model(params, transition) {
    const models                     = {};
    const articlesArticleIndexModels = this.modelFor('articles.article.index');
    assign(models, articlesArticleIndexModels);
    return hash(models);
  },

  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  }
});
