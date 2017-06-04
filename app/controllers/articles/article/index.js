import Ember from "ember";
import DS from 'ember-data';
import config from "../../../config/environment";
import { extractError } from "../../../lib/ajax-error";
import ApplicationController from "../../application";

const { UnauthorizedError } = DS;
const { computed, assert, A } = Ember;

export default ApplicationController.extend({
  articleRelateds: computed('model.article.articleRelateds.[]', function() {
    const article = this.get('article');
    assert('Must have article', !!article);
    return article.get('articleRelateds')
        .then((relatedArticles) => relatedArticles);
  }),

  currencies: config.APP.currencies,

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
          currentUser.get('articleWatcheds').removeObject(userArticleWatched);
          return Ember.RSVP.reject(error); });
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
          currentUser.get('articleSolds').removeObject(userArticleSold);
          return Ember.RSVP.reject(error); });
    },

  }
});
