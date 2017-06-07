import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: 'ui-b-resp-hero',
  is:         'primary',
  style:      computed.alias('is'),
});
