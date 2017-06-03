import Ember from 'ember';

const { computed } = Ember;

// @notused
export default Ember.Component.extend({
  classNames: 'container',
  is:         'primary',
  style:      computed.alias('is'),
});
