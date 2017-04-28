import Ember from "ember";
import UserSoldArticle from "../../models/user/sold-article";

const { computed, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  model(params, transition) {
    const { article } = this.modelFor('articles');
    const soldArticle = this.store.find('user/sold_article', params.user_sold_article_id);
    return hash({
      article,
      soldArticle,
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
    controller.reopen({
      soldArticleStatus: computed(() => UserSoldArticle.STATUS),
    });
  }
});
