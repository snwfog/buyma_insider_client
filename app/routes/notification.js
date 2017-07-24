import Ember from 'ember';
import moment from 'moment';
import { extractError } from '../lib/ajax-error';

const { computed, RSVP: { all, hash } } = Ember;

export default Ember.Route.extend({
  model(params, transition) {
    let articleNotifieds = this.currentUser.get('articleNotifieds');
    return hash({ articleNotifieds });
  },

  setupController(controller, models) {
    controller.setProperties(models);
    controller.reopen({
      actions: {
        '_readArticleNotified'(articleNotified) {
          articleNotified.set('readAt', moment());
          return articleNotified
            .save()
            .catch((error) => articleNotified.rollbackAttributes());
        }
      }
    });

    return this._super(...arguments);
  }
});
