import Ember from 'ember';
import UiSparklineComponent from '../-sparkline';

export default UiSparklineComponent.extend({
  options: {
    type:               'line',
    height:             40,
    lineColor:          '#00d1b2',
    lineWidth:          2,
    fillColor:          null,
    spotColor:          '#ff3860',
    minSpotColor:       '#ff3860',
    maxSpotColor:       '#ff3860',
    highlightSpotColor: '#ff3860',
    highlightLineColor: '#ff3860',
    chartRangeMin:      0,
  },
});
