import { Ability } from 'ember-can';

export default Ability.extend({
  canWatch(article) {
    const currentUser = this.currentUser;
    const hasWatchedArticle = currenUser.get('watchedArticles').includes(article);
    return hasWatchedArticle;
  },
});
