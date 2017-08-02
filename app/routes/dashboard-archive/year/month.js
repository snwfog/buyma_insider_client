import Ember from 'ember';

import moment from 'moment';

const { computed } = Ember;

export default Ember.Route.extend({
  setupController(ctrl, models, transition) {
    let yearModels = this.modelFor('dashboard-archive.year');
    let year       = get(yearModels, 'year');
    let month      = get(models, 'month');
    let days       = [ ...Array(moment(`${year}-${month}`, 'YYYY-MMMM').daysInMonth() + 1).keys() ].slice(1);
    ctrl.set('year', year);
    ctrl.set('month', month);
    ctrl.set('allDays', days);

    this.debug(days);

    return this._super(...arguments);
  }
});
