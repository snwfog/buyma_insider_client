import Ember from 'ember';
const { hash }  = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    return hash({
      merchantMetadatum: this.store.findAll('merchant/metadata'),
    });
  },
});
