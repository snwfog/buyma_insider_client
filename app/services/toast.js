import Ember from "ember";
import alertify from "alertify";

const { log, info, warn, error } = Ember.Logger;

let ToastService = Ember.Service.extend({
  init() {
    this._super(...arguments);
    var _this = this;
    'log success error'.w().forEach(function (alertType) {
      // alertify.delay(100000);
      _this[ alertType ] = function (message) {
        Ember.run.once(null, alertify[ alertType ], message);
      };
    });
  },

//   prompt(header, defaultValue, evaluate) {
//     return new Ember.RSVP.Promise(function (resolve, reject) {
//       alertify
//         .defaultValue(defaultValue)
//         .prompt(header, function (val, evt) {
//           evt.preventDefault();
//           if (evaluate(val)) {
//             Ember.run.once(null, resolve, val);
//           } else {
//             Ember.run.once(null, reject, val);
//           }
//         }, function (evt) {
//           evt.preventDefault();
//           Ember.run.once(null, reject);
//         });
//     });
//   }
});

export default ToastService;
