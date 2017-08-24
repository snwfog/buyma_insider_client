import Ember from 'ember';
import moment from 'moment';
import array from 'ember-awesome-macros/array';
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
      // sort function not working event with comparable interface
      // installed ember-awesome-macros
      // https://github.com/jasonmit/ember-cli-moment-shim/issues/97
      sortedArticleNotifieds: array.sort('articleNotifieds',
        (a, b) => moment.compare(b.get('createdAt'), a.get('createdAt'))),
      actions:                {
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
