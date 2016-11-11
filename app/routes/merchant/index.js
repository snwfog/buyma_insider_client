import Ember from 'ember';

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    var { metadatum } = this.modelFor('merchant');
    return hash({
      articles: this.store.query('article', { merchant: metadatum.id }),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
  }
});
