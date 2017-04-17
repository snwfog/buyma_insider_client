import Ember from "ember";
import config from "../config/environment";

export default Ember.Controller.extend({
  appName:   config.appName,
  loginPath: config.settings.path.login,
});
