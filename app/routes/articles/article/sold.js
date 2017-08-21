import Ember from 'ember';

const { assign, computed, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  model(params, transition) {
    const models                = {};
    const applicationModels     = this.modelFor('application');
    const articlesArticleModels = this.modelFor('articles.article');
    const articleSold           = this.store.findRecord('user/article_sold', params.user_article_sold_id);
    return hash(assign(models, applicationModels, articlesArticleModels, { articleSold }));
  },

  // has controller
  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  }
});
