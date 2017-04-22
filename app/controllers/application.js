import Ember from "ember";
import config from "../config/environment";

export default Ember.Controller.extend({
  appName:   config.appName,
  loginPath: config.settings.path.login,

  navBarIsActive: false,

  actions: {
    '_toast'(message, severity) {
      severity = severity || 'log';
      this.toastService[ severity ](message);
    },
  }
});
