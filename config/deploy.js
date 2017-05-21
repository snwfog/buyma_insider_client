/* jshint node: true */

module.exports = function (deployTarget) {
  var ENV = {
    build: {
      outputPath: 'dist',
    },

    gzip: {
      keep: true,
    },

    // include other plugin configuration that applies to all deploy targets here
  };


  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    ENV.redis             = {
      revisionKey: '__development__',
    };

    ENV.cp = {};
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'staging';

    ENV.redis = {
      host:           process.env.STAGING_HOST,
      allowOverwrite: true
    };

    ENV.sftp = {
      host:       process.env.STAGING_HOST,
      remoteUser: process.env.STAGING_REMOTE_USER,
      remoteDir:  process.env.STAGING_REMOTE_DIR,
      privateKey: process.env.STAGING_PRIVATE_KEY,
    };
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
