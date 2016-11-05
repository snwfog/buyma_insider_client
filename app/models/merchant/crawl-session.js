import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  startedAt:         attr('datetime'),
  finishedAt:        attr('datetime'),
  itemsCount:        attr('number'),
  invalidItemsCount: attr('number'),
  trafficSize:       attr('number'),
  elapsedTime:       attr('number'),
});
