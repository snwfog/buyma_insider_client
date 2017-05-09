import Ember from "ember";

const { merge, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  model(params, transition) {
    const applicationModels  = this.modelFor('application');
    const articleIndexModels = this.modelFor('articles.article.index');
    return hash(merge(applicationModels, articleIndexModels));
  },

  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  }
});
