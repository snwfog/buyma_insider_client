import Ember from 'ember';
import config from '../config/environment';

const { computed, RSVP: { all, hash } } = Ember;

export default Ember.Controller.extend({
  appName:                config.appName,
  loginPath:              config.settings.path.login,
  logoutPath:             config.settings.path.logout,
  navBarIsActive:         false,
  applicationUpdated:     computed.alias('applicationService.isUpdated'),
  unreadArticleNotifieds: computed.filterBy('articleNotifieds', 'isRead', false),

  jpyValue: computed('cadValue', 'exchangeRatesService.exchangeRates', function () {
    let cadValue             = this.get('cadValue');
    let { locale, code }     = this.exchangeRatesService.lookup('jpy');
    let formatter            = new Intl.NumberFormat(locale, {
      style:    'currency',
      currency: 'jpy'
    });
    let convertedAmount      = this.exchangeRatesService.cad2jpy(cadValue);
    return formatter.format(convertedAmount);
  }),
  cadValue: null,

//       cadValue: computed('jpyValue', 'exchangeRatesService.exchangeRates', function() {
//         var jpyValue = this.get('jpyValue');
//         return this.exchangeRatesService.convertCurrency('jpy', 'cad', jpyValue);
//       }),

  actions:                {
    '_toast'(message, severity) {
      severity = severity || 'log';
      this.toastService[ severity ](message);
    },

    '_searchArticles'() {
      let q = this.get('inputSearchArticleQuery');
      if (!q) {
        return Ember.RSVP.reject();
      }

      let queryParams = { q, extension: '_search' };
      return this.transitionToRoute('articles._search.index', { queryParams });
    },

    '_logout'() {
      this.debug('login out...');
      const $hidden_logout_form = Ember.$('#hidden-logout-form');
      Ember.assert('Must have logout form', !!$hidden_logout_form);
      $hidden_logout_form.submit();
    }
  }
});
