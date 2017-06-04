import config from "../config/environment";

const { log, info, warn, error, debug } = Ember.Logger;

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  if (config.environment === 'development') {
//    Ember.run.backburner.DEBUG = true;
//    window.sessionStorage.clear();
//    window.localStorage.clear();
  }

  if (config.environment === 'production') {
    log('CONFIG:: Disable ember inspector for production');
    window.NO_EMBER_DEBUG = true;
  }
}

export default {
  name:  '02-environment',
  after: '01-bootstrap',
  initialize
};
