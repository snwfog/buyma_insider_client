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
        cellComponent: 'ui.table.cell-datetime'
      },
      {
        label:         'Finished On', valuePath: 'finishedAt',
        cellComponent: 'ui.table.cell-datetime'
      },
      {
        label:         'Items Count', valuePath: 'itemsCount',
        cellComponent: 'ui.table.cell-integer'
      },
      {
        label:         'Invalid Items Count', valuePath: 'invalidItemsCount',
        cellComponent: 'ui.table.cell-integer'
      },
      {
        label:         'Traffic Size (byte)', valuePath: 'trafficSize',
        cellComponent: 'ui.table.cell-integer'
      },
      {
        label:         'Elapsed Time (s)', valuePath: 'elapsedTime',
        cellComponent: 'ui.table.cell-integer'
      },
    ];
  }),

  table: computed('crawlSessions', function() {
    return new Table(this.get('columns'), this.get('crawlSessions').sortBy('createdAt'));
  }),
});

UiTableCrawlSessionComponent.reopenClass({
  positionalParams: ['crawlSessions'],
});

export default UiTableCrawlSessionComponent;
