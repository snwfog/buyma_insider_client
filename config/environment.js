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
      BUYMA_CUT_PCT:     5.5,
      CAD_SALES_TAX_PCT: 15,
      currencies:        [ 'cad', 'jpy', 'usd' ],
      CURRENCIES:        {
        CAD: 'cad',
        JPY: 'jpy',
        USD: 'usd',
      },
      SERVER:            {
        namespace: 'api/v1',
      }
    },

    MODEL: {
      ARTICLES:      {
        IS_NEW_DAYS: 6, // Beyond this days, article will not be considered as new
        SYNC_HEALTH: {
          NEWEST_DAYS:     1,
          VERY_FRESH_DAYS: 7,
          FRESH_DAYS:      30,
          IN_SEASON_DAYS:  120,
          LAST_YEARS_DAYS: 365,
        }
      },
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

  ENV.settings = {
    path: {
      login:     '/login',
      logout:    '/logout',
      bootstrap: '/bootstrap',
    },
  };

  if (environment === 'development') {
    // Using bonjour DNS will slow from 2-3s on
    // windows machine trying to connect to mac
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
    ENV.APP.SERVER.endpoint = 'http://retina:8080';
  }

  if (environment === 'production') {
    ENV.APP.SERVER.endpoint = 'http://mini:8080'
  }

  // Addons and plugins configuration
  ENV.messageBus = {
    backend: ENV.APP.SERVER.endpoint,
  }

  ENV.moment = {
    outputFormat: 'MM/DD/YY HH:mm:SS'
  };

  // Addons
//  ENV.moment = {
//    outputFormat: 'LLL'
//  };

  return ENV;
};
