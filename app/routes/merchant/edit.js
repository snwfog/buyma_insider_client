import Ember from 'ember';

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    var { metadatum } = this.modelFor('merchant');
    return hash({
      metadatum,
    });
  }
});
