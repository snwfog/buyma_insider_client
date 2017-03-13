import Ember from "ember";
import config from "../config/environment";

const { hash } = Ember.RSVP;
const { computed } = Ember;

export default Ember.Route.extend({
  model() {
    var { merchants } = this.modelFor('application');
    return hash({ merchants });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.set('appName', config.appName);
    controller.setProperties(models);
    controller.reopen({
      searchArticles: [],
      articlesAutocomplete: computed('searchArticles.[]', function(completes) {
        return completes.inject((prev, item) => {
          prev.concat(item);
        }, []);
      }),

      actions: {
        '_searchArticles'(q) {
          var query = {
                       q,
            extension: '_autocomplete'
          };

          this.store
            .query('article', query)
            .then(function (articles) {
              controller.set('searchArticles', articles.get('meta.autocompletes'));
            });
        }
      }
    });
  },
});
