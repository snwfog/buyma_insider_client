import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { isEmpty } = Ember;

export default DS.Transform.extend({
  deserialize(serialized) {
    if (!isEmpty(serialized)) {
      return moment.utc(serialized).local();
    }
  },

  serialize(deserialized) {
    if (!isEmpty(deserialized)) {
      return moment(deserialized).utc();
    }
  }
});
