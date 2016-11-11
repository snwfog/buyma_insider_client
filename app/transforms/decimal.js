import Ember from 'ember';
import DS from 'ember-data';

var empty = Ember.isEmpty;

function isNumber(value) {
  return value === value
    && value !== Infinity
    && value !== -Infinity;
}

export default DS.Transform.extend({
  deserialize(serialized, { precision }) {
    var transformed;
    if (empty(serialized)) {
      return null;
    } else {
      transformed = Number(serialized);
      if (!!precision && precision > 0) {
        transformed = transformed.toFixed(precision);
      }

      return isNumber(transformed) ? transformed : null;
    }
  },

  serialize(deserialized, opts) {
    return deserialized;
  }
});
