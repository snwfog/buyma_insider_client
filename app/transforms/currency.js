import Ember from 'ember';
import DS from 'ember-data';

var empty = Ember.isEmpty;

function isNumber(value) {
  return value === value
    && value !== Infinity
    && value !== -Infinity;
}

export default DS.Transform.extend({
  deserialize(serialized) {
    var transformed;
    if (empty(serialized)) {
      return null;
    } else {
      transformed = Number(serialized).toFixed(2);
      return isNumber(transformed) ? transformed : null;
    }
  },

  serialize(deserialized) {
    return deserialized;
  }
});
