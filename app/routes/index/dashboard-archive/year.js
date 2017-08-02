import Ember from 'ember';

import moment from 'moment';

const { computed, get } = Ember;

export default Ember.Route.extend({
  setupController(ctrl, models, transition) {
    ctrl.reopen({
      allMonths: computed(() => moment.months().map((m) => m.toLowerCase())),
    });

    ctrl.set('year', get(models, 'year'));
    return this._super(...arguments);
  }
});
