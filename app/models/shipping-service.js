import Ember from "ember";
import DS from "ember-data";

const { computed }                 = Ember;
const { hasMany, belongsTo, attr } = DS;

export default DS.Model.extend({
  serviceName:  attr(),
  rate:         attr('money', { code: 'cad' }),
  weightInKg:   attr('number'),
  arriveInDays: attr('number'),
  tracked:      attr('boolean'),
});
