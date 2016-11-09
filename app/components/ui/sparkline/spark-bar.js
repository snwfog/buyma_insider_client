import Ember from 'ember';
import JQuerySparkline from 'ember-jquery-sparkline/components/spark-line';

export default JQuerySparkline.extend({
  options: { type: 'bar' },
  data:    [1, 2, 3, 4, 5, 6, 7, 8],
});
