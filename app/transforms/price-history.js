import DS from 'ember-data';
import moment from 'moment';

import config from '../config/environment';
import numericDecimalRound from '../utils/numeric/decimal-round';

export default DS.Transform.extend({
  deserialize(serialized) {
    let dateFormat = 'YYYY-MM-DD HH:mm:ss Z';
    let store      = this.store;
    return serialized.map((priceHistory) => {
      let price       = numericDecimalRound(priceHistory[ 'price' ]);
      let priceAmount = store.createRecord('money', {
        base:   config.APP.CURRENCIES.CAD,
        amount: price
      });

      return {
        price,
        priceAmount,
        timestamp: moment.utc(priceHistory[ 'timestamp' ], dateFormat).local(),
      };
    });
  },

  serialize(deserialized) {
    return deserialized;
  }
});
