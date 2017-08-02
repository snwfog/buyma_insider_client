import Ember from "ember";
import moment from "moment";

const { computed, }   = Ember;
const MOMENT_TEMPLATE = 'M-D-YY';

export default Ember.Route.extend({
  queryParams: {
    date: { refreshModel: true }
  },

  // has controller
  setupController(controller, models, transition) {
//     var queryParams = transition.queryParams;
    controller.setProperties(models);
    return this._super(...arguments);
  },

  resetController(controller, isExiting) {
    this._super(...arguments);
    if (isExiting) {
      controller.set('date', moment().format(MOMENT_TEMPLATE));
    }
  },
});
