/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    appName:                  'BUYMA バイマ INSIDER',
    modulePrefix:             'buyma-insider-client',
    environment:              environment,
    rootURL:                  '/',
    locationType:             'router-scroll',
    historySupportMiddleware: true,
    EmberENV:                 {
      FEATURES:          {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.APP.SERVER = {
    endpoint: 'http://localhost:9292',
    // Using bonjour DNS is slow from 2-3s on
    // windows machine trying to connect to mac
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
//    ENV.APP.LOG_TRANSITIONS          = true;
//    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS      = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  // Addons
//  ENV.moment = {
//    outputFormat: 'LLL'
//  };

  return ENV;
};
