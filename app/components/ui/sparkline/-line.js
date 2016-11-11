import Ember from 'ember';
import UiSparklineComponent from '../-sparkline';

export default UiSparklineComponent.extend({
  data:    [11, 9, 3, 32, 32, 23],
  options: {
    type:   'line',
    height: '50',
  },
});
