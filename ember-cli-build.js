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
    },

    sassOptions: {
      includePaths: [
        'bower_components/bulma',
        'bower_components/bulma-badge',
        'bower_components/bulma-timeline',
        'bower_components/bulma-ribbon',
        'bower_components/bulma-steps',
        'bower_components/bulma-tooltip',
      ]
    },
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
  app.import('vendor/message-bus.js');

//  app.sassOptions = {
//    includePaths: [
//      app.bowerDirectory + '/bulma-badge/',
//    ]
//  };

//  app.import({
//    development: app.bowerDirectory + '/bulma/css/bulma.css',
//    staging:     app.bowerDirectory + '/bulma/css/bulma.css',
//    production:  app.bowerDirectory + '/bulma/css/bulma.css',
//  });
//
//  app.import({
//    development: app.bowerDirectory + '/bulma-badge/badge.sass',
//    staging:     app.bowerDirectory + '/bulma-badge/badge.sass',
//    production:  app.bowerDirectory + '/bulma-badge/badge.sass',
//  });
//
//  app.import({
//    development: app.bowerDirectory + '/bulma-timeline/timeline.sass',
//    staging:     app.bowerDirectory + '/bulma-timeline/timeline.sass',
//    production:  app.bowerDirectory + '/bulma-timeline/timeline.sass',
//  });

  app.import({
    development: app.bowerDirectory + '/jquery.sparkline.bower/src/jquery.sparkline.js',
    staging:     app.bowerDirectory + '/jquery.sparkline.bower/src/jquery.sparkline.js',
    production:  app.bowerDirectory + '/jquery.sparkline.bower/dist/jquery.sparkline.min.js',
  });

  app.import(app.bowerDirectory + '/alertifyjs/dist/js/alertify.js');
  app.import(app.bowerDirectory + '/alertifyjs/dist/css/alertify.css');
  app.import('vendor/shims/alertify.js');

  return app.toTree();
};
