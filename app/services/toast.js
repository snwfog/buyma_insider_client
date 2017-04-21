import Ember from 'ember';

import alertify from 'alertify';

import ENV from '../config/environment';

const { log, info, warn, error } = Ember.Logger;

let ToastService = Ember.Service.extend({
  init() {
    this._super(...arguments);
    var _this = this;
    'log success error'.w().forEach(function(alertType) {
      _this[alertType] = alertify[alertType];
    });
  },

  prompt(header, defaultValue, evaluate) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      alertify
      .defaultValue(defaultValue)
      .prompt(header, function(val, evt) {
        evt.preventDefault();
        if (evaluate(val)) {
          Ember.run.once(null, resolve, val);
        } else {
          Ember.run.once(null, reject, val);
        }
      }, function(evt) {
        evt.preventDefault();
        Ember.run.once(null, reject);
      });
    });
  }
});

export default ToastService;
