import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { isEmpty } = Ember;
export default DS.Transform.extend({
  deserialize(serialized) {
    var seenAt, price;
    if (!isEmpty(serialized)) {
      if (serialized.hasOwnProperty('max')) {
        seenAt = moment.utc(serialized.max['seen-at'], 'YYYY-MM-DD HH:mm:ss Z').local();
        delete serialized.max['seen-at'];
        serialized.max['seenAt'] = seenAt;
      }

      if (serialized.hasOwnProperty('min')) {
        seenAt = moment.utc(serialized.min['seen-at'], 'YYYY-MM-DD HH:mm:ss Z').local();
        delete serialized.min['seen-at'];
        serialized.min['seenAt'] = seenAt;
      }
    }

    return serialized;
  },

  serialize(deserialized) {
    return deserialized;
  }
});
