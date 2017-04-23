import Ember from "ember";

const { computed } = Ember;

export default Ember.Component.extend({
  tagName:    'p',
  classNames: 'control',

  watchedArticle: computed('article', 'currentUser.watchedArticles.[]', function () {
    const article         = this.get('article');
    const watchedArticles = this.get('currentUser.watchedArticles');

    return watchedArticles.findBy('article.id', article.get('id'));
  }),

  article: null,
  actions: {
    watch() {
      return this.attrs.watch();
    }
  }
});
