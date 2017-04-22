import Ember from "ember";

const { alias } = Ember.computed;

export default Ember.Component.extend({
  classNames:        'buyma-insider-client-component ui-modal modal is-active',
  classNameBindings: [ 'isActive:is-active' ],
  isActive:          alias('activated'),
  activated:         false
});
