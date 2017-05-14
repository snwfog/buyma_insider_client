import Ember from "ember";
import moment from "moment";

const { computed, RSVP: { all, hash } } = Ember;

export default Ember.Route.extend({
  model(params, transition) {
    var articleNotifieds = this.currentUser.get('articleNotifieds');
    return hash({ articleNotifieds });
  },

  setupController(controller, models) {
    controller.setProperties(models);
    controller.reopen({
      actions: {
        '_readArticleNotified'(articleNotified) {
          articleNotified.set('readAt', moment());
          return articleNotified.save();
        }
      }
    });

    return this._super(...arguments);
  }
});
