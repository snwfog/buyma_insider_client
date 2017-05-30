import Ember from "ember";
import { Ability } from "ember-can";

const { computed } = Ember;

export default Ability.extend({
  canEdit: false,
});