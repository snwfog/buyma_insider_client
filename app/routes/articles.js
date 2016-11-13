import Ember from "ember";

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model(params) {
    return hash({
      article: this.store.find('article', params[ 'article_id' ])
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
  }
});
