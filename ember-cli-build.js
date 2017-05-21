/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sourcemaps: {
      enabled: EmberApp.env() !== 'production',
      extensions: ['js'],
    },
    // Add options here
    SRI: {
      enabled: false,
    },

    minifyJS: {
      enabled: EmberApp.env() === 'production',
    },

    minifyCSS: {
      enabled: EmberApp.env() === 'production',
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Example of different import environment
  // @see https://guides.emberjs.com/v2.0.0/addons-and-dependencies/managing-dependencies/
  app.import({
    development: app.bowerDirectory + '/bulma/css/bulma.css',
    staging:     app.bowerDirectory + '/bulma/css/bulma.css',
    production:  app.bowerDirectory + '/bulma/css/bulma.css',
  });

  app.import(app.bowerDirectory + '/jquery.sparkline.bower/src/jquery.sparkline.js');

  app.import(app.bowerDirectory + '/alertifyjs/dist/js/alertify.js');
  app.import(app.bowerDirectory + '/alertifyjs/dist/css/alertify.css');
  app.import('vendor/shims/alertify.js');
  return app.toTree();
};
