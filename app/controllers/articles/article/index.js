import Ember from "ember";
import { extractError } from "../../../lib/ajax-error";
import config from "../../../config/environment";
import ApplicationController from "../../application";

const { computed, assert, A } = Ember;

export default ApplicationController.extend({
  articleWatched: computed('currentUser.articleWatcheds.[]', 'model.article', function () {
    const article = this.get('article');
    assert('Must have article', !!article);
    const currentUserArticleWatcheds = this.get('currentUser.articleWatcheds');
    if (!currentUserArticleWatcheds) { return A(); }
    else {
      return currentUserArticleWatcheds.findBy('article.id', article.get('id'));
    }
  }),

  // TODO: This properties cause ember-moment to log error
  // In sum, this is recomputed before adapter replies saved
  // We should take care with this instead of just filtering out
  // Update: Using {{with}} helper will resolve this
  articleSolds: computed('currentUser.articleSolds.[]', 'model.article', function() {
    const article                 = this.get('article');
    assert('Must have article', !!article);
    const currentUserArticleSolds = this.get('currentUser.articleSolds');
    if (!currentUserArticleSolds) { return A(); }
    else {
      return currentUserArticleSolds.filterBy('article.id', article.get('id'));
    }
  }),

  articleRelateds: computed('model.article.articleRelateds.[]', function() {
    const article = this.get('article');
    assert('Must have article', !!article);
    return article.get('articleRelateds')
        .then((relatedArticles) => relatedArticles)
        .catch(extractError);
  }),

  currencies: config.APP.currencies,

  // Temporarily just return all discount percent criteria
  allArticleNotificationCriteria: computed(function() {
    return this.store.peekAll('article/notificationCriterium/discountPercent');
  }),

  selectArticleNotificationCriterium: null,

  actions: {
    '_watchArticle'(article) {
      this.debug(`watched this article ${article.get('name')}`);
      const store              = this.store;
      const currentUser        = this.currentUser;
      const userArticleWatched = store
        .createRecord('user/articleWatched', { article, user: currentUser });

      return userArticleWatched
        .save()
        .then((articleWatched) => {
          currentUser.get('articleWatcheds').pushObject(articleWatched); })
        .catch((error) => {
          this.debug(error);
          currentUser.get('articleWatcheds').removeObject(userArticleWatched);
          return Ember.RSVP.reject(); });
    },

    '_sellArticle'(article) {
      this.debug(`sold this article ${article.get('name')}`);
      const store               = this.store;
      const currentUser         = this.currentUser;
      const latestExchangeRates = this.get('exchangeRatesService.latest');
      const userArticleSold     = store.createRecord('user/articleSold', {
                      article,
        user:         currentUser,
        exchangeRate: latestExchangeRates
      });

      return userArticleSold
        .save()
        .then((articleSold) => {
          currentUser.get('articleSolds').pushObject(articleSold); })
        .catch((error) => {
          this.debug(error);
          currentUser.get('articleSolds').removeObject(userArticleSold);
          return Ember.RSVP.reject(); });
    },

    '_unwatchArticle'(articleWatched) {
      this.debug(`unsell article ${articleWatched.get('article.name')}`);
      const currentUser = this.currentUser;
      articleWatched.deleteRecord();
      return articleWatched
        .save()
        .then((articleWatched) => {
          currentUser.get('articleWatched').removeObject(articleWatched); });
    },

    '_unsellArticle'(articleSold) {
      this.debug(`unsell article ${articleSold.get('article.name')}`);
      const currentUser = this.currentUser;
      articleSold.deleteRecord();
      return articleSold
        .save()
        .then((articleSold) => {
          currentUser.get('articleSolds').removeObject(articleSold); });
    },

    '_assignSelectArticleNotificationCriterium'(articleNotificationCriterium, articleNotificationCriteriumId) {
      this.set('selectArticleNotificationCriterium', articleNotificationCriterium);
    },

    '_addArticleNotificationCriterium'() {
      var articleNotificationCriterium = this.get('selectArticleNotificationCriterium');
      Ember.assert('Must have an article notification criterium', !!articleNotificationCriterium);
      var articleWatched = this.get('articleWatched');
      articleWatched.get('notificationCriteria').pushObject(articleNotificationCriterium);
      return articleWatched
        .save()
        .then((articleWatched) => {
          this.set('selectArticleNotificationCriterium', null); });
    },

    '_removeArticleNotificationCriterium'(articleNotificationCriterium) {
      var articleWatched = this.get('articleWatched');
      Ember.assert('Must have an article notification criterium', !!articleNotificationCriterium);
      articleWatched.get('notificationCriteria').removeObject(articleNotificationCriterium);
      return articleWatched
        .save()
        .catch((error) => {
          articleWatched.get('notificationCriteria').pushObject(articleNotificationCriterium); });
    },
  }
});
