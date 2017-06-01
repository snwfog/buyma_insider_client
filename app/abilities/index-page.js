import { Ability } from 'ember-can';

export default Ability.extend({
  canRefresh() {
    return true;
  },
});
