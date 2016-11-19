import DS from 'ember-data';
import moment from 'moment';
import numericDecimalRound from '../utils/numeric/decimal-round';

export default DS.Transform.extend({
  deserialize(serialized) {
    let priceHistories = [];
    if (!serialized) {
      return priceHistories;
    }

    Object.keys(serialized)
      .forEach((recordedTime) => {
        priceHistories.push({
          createdAt: moment.utc(recordedTime).local(),
          price:     numericDecimalRound(serialized[recordedTime]),
        });
      });

    return priceHistories;
  },

  serialize(deserialized) {
    return deserialized;
  }
});
