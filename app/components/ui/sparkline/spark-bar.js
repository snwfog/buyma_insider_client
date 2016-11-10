import Ember from 'ember';
import JQuerySparkline from 'ember-jquery-sparkline/components/spark-line';

const { on } = Ember;

export default Ember.Component.extend({
  tagName:    null,
  classNames: 'component-ui-sparkline sparkline'.w(),
  options:    {
    type:            'bar',
    height:          '50',
    barWidth:        10,
    barSpacing:      2,
    zeroAxis:        false,
    barColor:        '#00d1b2',
    negBarColor:     '#ff3860',
    stackedBarColor: ['#00d1b2', '#ff3860'],
  },

  onDidInsertElement: on('didInsertElement', function() {
    var sparkline, _this = this;

    let options    = this.get('options') || {};
    let data       = this.get('data');
    let _sparkline = this.$().sparkline(data, options);

    this.$().bind('sparklineClick', function(ev) {
      _this.set('sparklineClick', ev.sparklines[0]);
    });
    this.$().bind('sparklineRegionChange', function(ev) {
      _this.set('sparklineRegionChange', ev.sparklines[0]);
    });

    this.set('_sparkline', _sparkline);
  }),

  click() {
    this.sendAction('action', this.get('sparklineClick'));
  },

  mouseMove() {
    if (this.get('hover')) {
      let sp = this.get('sparklineRegionChange');
      if (sp) {
        this.sendAction('hover', sp);
      }
    }
  },

  onWillDestroyElement: on('willDestroyElement', function() {
    let _sparkline = this.get('_sparkline');
    if (!!_sparkline) _sparkline.remove();
    this._super(...arguments);
  }),
});
