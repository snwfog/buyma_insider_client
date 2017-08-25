import DS from 'ember-data';
import moment from 'moment';
import numericDecimalRound from '../utils/numeric/decimal-round';

export default DS.Transform.extend({
  deserialize(serialized) {
    let dateFormat = 'YYYY-MM-DD HH:mm:ss Z';
    return serialized.map((priceHistory) => {
      return {
        timestamp: moment.utc(priceHistory[ 'timestamp' ], dateFormat).local(),
        price:     numericDecimalRound(priceHistory[ 'price' ]),
      };
    });
  },

  serialize(deserialized) {
    return deserialized;
  }
});
