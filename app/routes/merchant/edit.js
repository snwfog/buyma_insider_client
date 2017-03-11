import Ember from "ember";

const { hash }  = Ember.RSVP;
const { alias } = Ember.computed;

export default Ember.Route.extend({
  model() {
    var { merchant } = this.modelFor('merchant');
    return hash({
      merchant,
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
    controller.reopen({
      metadatum: alias('merchant.metadatum')
    });
  }
});
