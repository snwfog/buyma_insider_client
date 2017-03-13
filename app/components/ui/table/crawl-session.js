import Ember from 'ember';
import Table from 'ember-light-table';

const { computed } = Ember;

const UiTableCrawlSessionComponent = Ember.Component.extend({
  tagName:       null,
  crawlSessions: null,
  columns:       computed(function() {
    return [
      {
        label:         'Started On', valuePath: 'startedAt',
        cellComponent: 'ui.table.cell-datetime',
        sorted:        true,
      },
      {
        label:         'Traffic Size (kB)', valuePath: 'trafficSizeKb',
        cellComponent: 'ui.table.cell-integer'
      },
      {
        label:         'Elapsed Time (s)', valuePath: 'elapsedTimeS',
        cellComponent: 'ui.table.cell-integer'
      },
    ];
  }),

  table: computed('crawlSessions', function() {
    return new Table(this.get('columns'),
      this.get('crawlSessions')
        .sortBy('startedAt')
        .reverse());
  }),
});

UiTableCrawlSessionComponent.reopenClass({
  positionalParams: ['crawlSessions'],
});

export default UiTableCrawlSessionComponent;
