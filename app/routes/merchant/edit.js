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
    controller.setProperties(models);
    controller.reopen({
      metadatum: alias('merchant.metadatum')
    });

    return this._super(...arguments);
  }
});
