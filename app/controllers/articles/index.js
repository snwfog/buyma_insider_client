import Ember from "ember";
import ApplicationController from "../application";

const { computed } = Ember;

export default ApplicationController.extend({
  watchedArticle: computed('currentUser.watchedArticles.[]', 'model.article', function () {
    const article                    = this.get('article');
    const currentUserWatchedArticles = this.currentUser.get('watchedArticles');
    return currentUserWatchedArticles.findBy('article.id', article.get('id'));
  }),

  // TODO: This properties cause ember-moment to log error
  // In sum, this is recomputed before adapter replies saved
  // We should take care with this instead of just filtering out
  soldArticles: computed('currentUser.soldArticles.[]', function () {
    const article                 = this.get('article');
    const currentUserSoldArticles = this.currentUser.get('soldArticles');
    return currentUserSoldArticles.filterBy('article.id', article.get('id'));
  }),

  actions: {
    '_watchArticle'(article) {
      this.debug(`watched this article ${article.get('name')}`);
      const store       = this.store;
      const currentUser = this.currentUser;
      return store
        .createRecord('user/watchedArticle', { article, user: currentUser })
        .save()
        .then((watchedArticle) => {
          currentUser.get('watchedArticles').pushObject(watchedArticle); });
    },

    '_unwatchArticle'(watchedArticle) {
      this.debug(`unsell article ${watchedArticle.get('article.name')}`);
      const currentUser = this.currentUser;
      watchedArticle.deleteRecord();
      return watchedArticle
        .save()
        .then((watchedArticle) => {
          currentUser.get('watchedArticle').removeObject(watchedArticle); });
    },

    '_sellArticle'(article) {
      this.debug(`sold this article ${article.get('name')}`);
      const store               = this.store;
      const currentUser         = this.currentUser;
      const latestExchangeRates = this.get('exchangeRatesService.latest');
      const userSoldArticle     = store.createRecord('user/soldArticle', {
                      article,
        user:         currentUser,
        exchangeRate: latestExchangeRates
      });

      return userSoldArticle
        .save()
        .then((soldArticle) => {
          currentUser.get('soldArticles').pushObject(soldArticle); });
    },

    '_unsellArticle'(soldArticle) {
      this.debug(`unsell article ${soldArticle.get('article.name')}`);
      const currentUser = this.currentUser;
      soldArticle.deleteRecord();
      return soldArticle
        .save()
        .then((soldArticle) => {
          currentUser.get('soldArticles').removeObject(soldArticle); });
    },
  }
});
