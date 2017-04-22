import Ember from "ember";
import ApplicationController from "../application";

const { computed } = Ember;

export default ApplicationController.extend({
  watchedArticle: computed('currentUser.watchedArticles.[]', function () {
    const article                    = this.get('article');
    const currentUserWatchedArticles = this.currentUser.get('watchedArticles');
    if (currentUserWatchedArticles.findBy('article.id', article.get('id'))) {
      return article;
    }
    return null;
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
          currentUser.get('watchedArticles').pushObject(watchedArticle);
        });
    },

    '_sellArticle'(article) {
      this.debug(`sold this article ${article.get('name')}`);
      return new Ember.RSVP.Promise(function (resolve, reject) {
        Ember.run.later(null, resolve, 1000);
      });
    },
  }
});
