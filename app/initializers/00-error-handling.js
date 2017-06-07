import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

const { log, info, warn, error, debug } = Ember.Logger;

export function initialize(application) {
  if (config.environment !== 'production') {
    Ember.onerror = function(ex) {
      // @see https://stackoverflow.com/questions/503093/how-to-redirect-to-another-webpage-in-javascript-jquery/506004#506004
      // window.location.href = 'http://localhost:4200/error.html';
      // window.location.href = '/login';
      error(`ERROR (InitHandler): ${ex.message}`);
      error(`ERROR (InitHandler): ${ex.stack}`);
      if (ex instanceof DS.UnauthorizedError) {
        window.location.replace('/login');
      }
    };

    Ember.RSVP.on('error', function(ex) {
      if (ex.name === 'TransitionAborted') {
        error(`ERROR (InitHandler): TransitionAborted`);
      }

      if (ex instanceof DS.UnauthorizedError) {
        error(`ERROR (InitHandler): Unauthorized ${ex.message}`);
        window.location.replace('/login');
      }

      error(`ERROR (InitHandler): Ember.RSVP error ${ex.message}`);
      error(`ERROR (InitHandler): Ember.RSVP error ${ex.stack}`);

      return Ember.RSVP.rethrow(ex);
    });
  }

  // if (config.environment === 'production') {}
}

export default {
  name: '00-error-handling',
  initialize
};