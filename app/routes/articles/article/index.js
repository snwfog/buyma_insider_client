import Ember from "ember";

const { assign, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  model(params) {
    // If we pass {{#link-to 'articles' article}} to
    // link-to and to the route, then Ember do not
    // call adapter again to refetch the model
    // If we pass id, then it will automatically
    // call adapter to refetch.
    const models                         = {};
    const articlesArticleModels          = this.modelFor('articles.article');
    const allArticleNotificationCriteria = this.store.peekAll('article/notificationCriterium/discountPercent');
    assign(models, articlesArticleModels, { allArticleNotificationCriteria });
    // if (!!this.currentUser) {
    //   const currentUserArticleWatcheds = this.currentUser.get('articleWatcheds');
    //   const currentUserArticleSolds    = this.currentUser.get('articleSolds');
    //   assign(models, { currentUserArticleWatcheds,
    //                    currentUserArticleSolds });
    // }

    return hash(models);
  },

  // has controller
  setupController(controller, models) {
    controller.setProperties(models);
    return this._super(...arguments);
  },

  // Always default to information route
  // Update: This redirect messed up all subroute modelFor methods...
  // redirect(models, transition) {
  //   this.transitionTo('articles.article.index.information', models.article);
  // }
});
