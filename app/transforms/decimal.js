import DS from 'ember-data';
import numericDecimalRound from '../utils/numeric/decimal-round';

export default DS.Transform.extend({
  deserialize(serialized, { precision }) {
    return numericDecimalRound(serialized, precision);
  },

  serialize(deserialized, opts) {
    return deserialized;
  }
});
