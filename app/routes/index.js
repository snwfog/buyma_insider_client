import Ember from "ember";
import config from "../config/environment";

const { hash }     = Ember.RSVP;
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

      jpyValue: computed('cadValue', 'exchangeRatesService.exchangeRates', function () {
        var cadValue             = this.get('cadValue');
        var { locale, code }     = this.exchangeRatesService.lookup('jpy');
        var formatter            = new Intl.NumberFormat(locale, {
          style:    'currency',
          currency: 'jpy'
        });
        var convertedAmount      = this.exchangeRatesService.cad2jpy(cadValue);
        return formatter.format(convertedAmount);
      }),

      cadValue: null,

//       cadValue: computed('jpyValue', 'exchangeRatesService.exchangeRates', function() {
//         var jpyValue = this.get('jpyValue');
//         return this.exchangeRatesService.convertCurrency('jpy', 'cad', jpyValue);
//       }),

      articlesAutocomplete: computed('searchArticles.[]', function (completes) {
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
