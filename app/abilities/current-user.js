import { Ability } from 'ember-can';

export default Ability.extend({
  canWatch(article) {
    const currentUser = this.currentUser;
    const hasArticleWatched = currenUser.get('articleWatcheds').includes(article);
    return hasArticleWatched;
  },
});
