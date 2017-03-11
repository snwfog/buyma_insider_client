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
        // TODO: Fix backend price history hash
        // to use array and proper UTC timestamps
        // instead of hacking front end
        priceHistories.push({
          createdAt: moment.utc(recordedTime, 'YYYY-MM-DD HH:mm:ss Z').local(),
          price:     numericDecimalRound(serialized[recordedTime]),
        });
      });

    return priceHistories;
  },

  serialize(deserialized) {
    return deserialized;
  }
});
