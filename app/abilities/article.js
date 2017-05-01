import Ember from "ember";
import {Ability} from "ember-can";

const { computed } = Ember;

export default Ability.extend({
  canSell:  computed.notEmpty('currentUser'),

  canWatch: computed('currentUser.articleWatcheds.[]', function() {
    const article     = this.model;
    const currentUser = this.currentUser;
    return currentUser
      .get('articleWatcheds')
      .then((articleWatcheds) => {
        return !articleWatcheds.findBy('article.id', article.get('id')); });
  }),

  canUnwatch: computed('currentUser.articleWatcheds.[]', function() {
    const article     = this.model;
    const currentUser = this.currentUser;
    return currentUser
      .get('articleWatcheds')
      .then((articleWatcheds) => {
        return !!articleWatcheds.findBy('article.id', article.get('id')); });
  }),
});
