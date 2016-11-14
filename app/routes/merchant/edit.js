import Ember from 'ember';

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    var { metadatum } = this.modelFor('merchant');
    return hash({
      metadatum,
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
  }
});
