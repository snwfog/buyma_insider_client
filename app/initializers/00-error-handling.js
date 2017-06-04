import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

const { log, info, warn, error, debug } = Ember.Logger;

export function initialize(application) {
  if (config.environment === 'development') {
    Ember.onerror = function(ex) {
      error('ERROR: Handled in global handler', ex);
      // window.location.href = '/login';
      // @see https://stackoverflow.com/questions/503093/how-to-redirect-to-another-webpage-in-javascript-jquery/506004#506004
      window.location.replace('/login');
    };

    Ember.RSVP.on('error', function(ex) {
      if (ex.name === 'TransitionAborted') {
        info(`Transition aborted handled in errors-handling`);
        return;
      }

      if (ex instanceof DS.UnauthorizedError) {
        error(`Request unauthorized ${ex}`);
        window.location.replace('/login');
      }

      error('ERROR: Promise error!!!', ex);
      return Ember.RSVP.rethrow(ex);
//      window.location.href = 'http://localhost:4200/error.html';
    });
  }

  if (config.environment === 'production') {
  }
}

export default {
  name: '00-error-handling',
  initialize
};