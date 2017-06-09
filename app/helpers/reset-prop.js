import Ember from 'ember';
import get from "ember-metal/get";
import set from "ember-metal/set";
import { isPresent } from "ember-utils";

export default Ember.Helper.extend({
  compute([prop, obj, ...values], hash) {
    return function() {
      let currentValue = get(obj, prop);
      return set(obj, prop, null);
    };
  }
});
