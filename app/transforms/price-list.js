import DS from "ember-data";
import moment from "moment";
import numericDecimalRound from "../utils/numeric/decimal-round";

export default DS.Transform.extend({
  deserialize(serialized) {
    var dateFormat = 'YYYY-MM-DD HH:mm:ss Z';
    return serialized
      .map((priceObj) => {
        return {
          createdAt: moment.utc(priceObj[ 'timestamp' ], dateFormat).local(),
          price:     numericDecimalRound(priceObj[ 'price' ]),
        };
      });
  },

  serialize(deserialized) {
    return deserialized;
  }
});
