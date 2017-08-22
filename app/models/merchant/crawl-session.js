import DS from 'ember-data';

const { belongsTo, attr } = DS;

export default DS.Model.extend({
  merchant:          belongsTo('merchant', { async: true }),
  startedAt:         attr('datetime'),
  finishedAt:        attr('datetime'),
  itemsCount:        attr('number'),
  invalidItemsCount: attr('number'),
  trafficSizeKb:     attr('number'),
  elapsedTimeS:      attr('decimal', { precision: 2 }),
});


