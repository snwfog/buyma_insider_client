/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    appName:                  'BUYMA バイマ INSIDER',
    modulePrefix:             'buyma-insider-client',
    environment:              environment,
    rootURL:                  '/',
    locationType:             'router-scroll',
    historySupportMiddleware: true,
    EmberENV:                 {
      FEATURES:          {
        'ds-extended-errors': true,
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      buymaCutPct: 5.5,
      saleTaxPct:  15,
      currencies:  [ 'cad', 'jpy', 'usd' ],
      CURRENCIES:  {
        CAD: 'cad',
        JPY: 'jpy',
        USD: 'usd',
      },
      SERVER:      {
        namespace: 'api/v1',
      }
    },

    MODEL: {
      EXTRA_TARIFFS: {
        RATE_TYPE: {
          FLAT_RATE:    'float_rate',
          PERCENT_RATE: 'percent_rate'
        },

        FLOW_DIRECTION: {
          INFLOW:  'inflow',
          OUTFLOW: 'outflow',
        }
      }
    }
  };

  // TODO: Merge this with endpoint
  ENV.settings = {
    path: {
      login:     '/login',
      logout:    '/logout',
      bootstrap: '/bootstrap',
    },
  };

  ENV.moment = {
    outputFormat: 'MM/DD/YY HH:mm:SS'
  };

  if (environment === 'development') {
    // Using bonjour DNS will slow from 2-3s on
    // windows machine trying to connect to mac
    //     endpoint: 'http://192.168.0.16:9292', // air.local
    ENV.APP.SERVER.endpoint     = 'http://localhost:9292';
    ENV.settings.path.login     = ENV.APP.SERVER.endpoint + ENV.settings.path.login;
    ENV.settings.path.logout    = ENV.APP.SERVER.endpoint + ENV.settings.path.logout;
    ENV.settings.path.bootstrap = ENV.APP.SERVER.endpoint + ENV.settings.path.bootstrap;
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

  if (environment === 'staging') {
    // ENV.APP.SERVER.endpoint = 'http://retina.local:9292';
  }

  if (environment === 'production') {

  }

  // Addons
//  ENV.moment = {
//    outputFormat: 'LLL'
//  };

  return ENV;
};
