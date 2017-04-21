import Ember from "ember";

export default Ember.Route.extend({
  model() {
    return this.modelFor('articles');
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);

    const _this = this;
    const store = this.store;
    const currentUser = this.currentUser;
    controller.reopen({
      actions: {
        '_watchArticle'(article) {
          this.debug(`watched this article ${article.get('name')}`);
          return store
            .createRecord('user/watchedArticle', { article, user: currentUser })
            .save()
            .then((watchedArticle) => {
              currentUser.get('watchedArticles').pushObject(watchedArticle);
            });
        },

        '_soldArticle'(article) {
          this.debug(`sold this article ${article.get('name')}`);
          return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.run.later(null, resolve, 2000);
          });
        }
      }
    });
  }
});
