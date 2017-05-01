import Ember from "ember";

const { computed } = Ember;

export default Ember.Component.extend({
  tagName:    'p',
  classNames: 'control',

  articleWatched: computed('article', 'currentUser.articleWatcheds.[]', function () {
    const article         = this.get('article');
    const articleWatcheds = this.get('currentUser.articleWatcheds');

    return articleWatcheds.findBy('article.id', article.get('id'));
  }),

  article: null,
  actions: {
    watch() {
      return this.attrs.watch();
    }
  }
});
