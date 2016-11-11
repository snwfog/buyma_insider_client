import Ember from 'ember';
import UiSparklineComponent from '../-sparkline';

export default UiSparklineComponent.extend({
  options: {
    type:            'bar',
    height:          '50',
    barWidth:        10,
    barSpacing:      2,
    zeroAxis:        false,
    barColor:        '#00d1b2',
    negBarColor:     '#ff3860',
    stackedBarColor: ['#00d1b2', '#ff3860'],
  },
});
