import Ember from "ember";
import moment from "moment";

const { computed, }   = Ember;
const MOMENT_TEMPLATE = 'M-D-YY';

export default Ember.Controller.extend({
//   queryParams: [ 'date' ],
  count:       7,

  allMonths: computed(() => moment.months()),
  allYears:  computed(() => [ 2106, 2017 ]),

  currentDate: computed('date', function () {
    var dateQs = this.get('date');
    if (dateQs) {
      return moment(dateQs, MOMENT_TEMPLATE);
    } else {
      return moment();
    }
  }),

  nextMonth: computed('date', function () {
    const currentDate = this.get('currentDate');
    return currentDate.clone().add(1, 'months').startOf('month');
  }),

  prevMonth: computed('date', function () {
    const currentDate = this.get('currentDate');
    return currentDate.clone().add(-1, 'months').endOf('month');
  }),

  nextYear: computed('date', function () {
    const currentDate = this.get('currentDate');
    return currentDate.clone().add(1, 'years').startOf('year');
  }),

  prevYear: computed('date', function () {
    const currentDate = this.get('currentDate');
    return currentDate.clone().add(-1, 'years').endOf('year');
  }),

  dates: computed('count', 'date', function () {
    const { count, date, currentDate } = this.getProperties('count', 'date', 'currentDate');
    return Array.from({ length: count }, function (_, i) {
      const dateDelta = Math.ceil(i + -count / 2);
      return currentDate.clone().add(dateDelta, 'days');
    });
  }),
});
