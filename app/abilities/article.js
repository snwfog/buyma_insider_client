import Ember from "ember";
import {Ability} from "ember-can";

const { computed } = Ember;

export default Ability.extend({
  canSell:  computed.notEmpty('currentUser'),

  canWatch: computed('currentUser.watchedArticles.[]', function() {
    const article     = this.model;
    const currentUser = this.currentUser;
    return currentUser
      .get('watchedArticles')
      .then((watchedArticles) => {
        return !watchedArticles.findBy('article.id', article.get('id')); });
  }),

  canUnwatch: computed('currentUser.watchedArticles.[]', function() {
    const article     = this.model;
    const currentUser = this.currentUser;
    return currentUser
      .get('watchedArticles')
      .then((watchedArticles) => {
        return !!watchedArticles.findBy('article.id', article.get('id')); });
  }),
});
