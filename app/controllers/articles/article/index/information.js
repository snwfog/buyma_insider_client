import Ember from "ember";
import ApplicationController from "../../../application";

const { computed, assert, A } = Ember;

export default ApplicationController.extend({
  // Temporarily just return all discount percent criteria
  allArticleNotificationCriteria:         null,
  selectArticleNotificationCriterium:     null,
  articleWatchedNotificationCriteriumIds: computed.mapBy('articleWatchedNotificationCriteria', 'id').readOnly(),
  articleWatchedNotificationCriteria:     computed('articleWatched.id', function() {
    return this.get('articleWatched.notificationCriteria');
  }).readOnly(),

  articleWatched: computed('currentUser.articleWatcheds.[]', 'model.article', function() {
    const article = this.get('model.article');
    assert('Must have article', !!article);
    const currentUserArticleWatcheds = this.get('currentUser.articleWatcheds');
    if (currentUserArticleWatcheds) {
      return currentUserArticleWatcheds.findBy('article.id', article.get('id'));
    } else {
      return null;
    }
  }).readOnly(),

  // TODO: This properties cause ember-moment to log error
  // In sum, this is recomputed before adapter replies saved
  // We should take care with this instead of just filtering out
  // Update: Using {{with}} helper will resolve this
  // Update: Ember 2.13 had to rework these
  articleSolds: computed('currentUser.articleSolds.[]', 'model.article', function() {
    const article = this.get('model.article');
    assert('Must have article', !!article);
    const currentUserArticleSolds = this.get('currentUser.articleSolds');
    if (currentUserArticleSolds) {
      return currentUserArticleSolds.filterBy('article.id', article.get('id'));
    } else {
      return A();
    }
  }).readOnly(),

  actions: {
    '_unwatchArticle'(articleWatched) {
      this.debug(`un-watching article ${articleWatched.get('article.name')}`);
      const currentUser = this.currentUser;
      assert('Must have currentUser', !!currentUser);
      articleWatched.deleteRecord();
      return articleWatched
        .save()
        .then((articleWatched) => {
          currentUser.get('articleWatcheds').removeObject(articleWatched); });
    },

    '_unsellArticle'(articleSold) {
      this.debug(`un-selling article ${articleSold.get('article.name')}`);
      const currentUser = this.currentUser;
      assert('Must have currentUser', !!currentUser);
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
      const articleNotificationCriterium = this.get('selectArticleNotificationCriterium');
      Ember.assert('Must have an article notification criterium', !!articleNotificationCriterium);
      const articleWatched = this.get('articleWatched');
      articleWatched.get('notificationCriteria').pushObject(articleNotificationCriterium);
      return articleWatched
        .save()
        .then((articleWatched) => {
          this.set('selectArticleNotificationCriterium', null); });
    },

    '_removeArticleNotificationCriterium'(articleNotificationCriterium) {
      const articleWatched = this.get('articleWatched');
      Ember.assert('Must have an article notification criterium', !!articleNotificationCriterium);
      articleWatched.get('notificationCriteria').removeObject(articleNotificationCriterium);
      return articleWatched
        .save()
        .catch((error) => {
          articleWatched.get('notificationCriteria').pushObject(articleNotificationCriterium); });
    },
  }
});

