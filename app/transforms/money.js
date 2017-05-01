import Ember from "ember";
import DS from "ember-data";

export default DS.Transform.extend({
  store: Ember.inject.service('store'),
  deserialize(serialized, { code }) {
    code = code || 'cad';
    return this.get('store')
      .createRecord('money', {
        base:   code,
        amount: serialized
      });
  },

  serialize(deserialized) {
    if (!!deserialized) {
      return deserialized.get('amount');
    }
  }
});
