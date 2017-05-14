import Ember from "ember";
import config from "../config/environment";

const { computed, RSVP: { all, hash } } = Ember;

export default Ember.Controller.extend({
  appName:                config.appName,
  loginPath:              config.settings.path.login,
  navBarIsActive:         false,
  unreadArticleNotifieds: computed.filterBy('articleNotifieds', 'read?', false),
  actions:                {
    '_toast'(message, severity) {
      severity = severity || 'log';
      this.toastService[ severity ](message);
    },

    '_searchArticles'() {
      var q = this.get('inputSearchArticleQuery');
      if (!q) {
        return Ember.RSVP.reject();
      }

      var queryParams = { q, extension: '_search' };
      return this.transitionToRoute('articles._search.index', { queryParams });
    }
  }
});
