import Ember from 'ember';
const { hash }  = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    return hash({
      merchantMetadata: this.store.findAll('merchant/metadatum'),
    });
  },
});
