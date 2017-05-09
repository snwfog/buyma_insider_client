import Ember from "ember";
import ApplicationController from "./application";

const { hash }     = Ember.RSVP;
const { computed } = Ember;

export default ApplicationController.extend({
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
//         '_searchArticles'() {
//           var q     = this.get('inputSearchArticleQuery');
//           if (!q) {
//             return Ember.RSVP.reject();
//           }
//
//           var queryParams = { q, extension: '_search' };
//           return this.transitionToRoute('articles._search.index', { queryParams });
//           return this.store
//             .query('article', query)
//             .then(function (articles) {
//               controller.set('searchArticles', articles.get('meta.autocompletes')); });
//         }
  }
});
