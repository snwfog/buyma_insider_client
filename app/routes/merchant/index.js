import Ember from 'ember';

const { merge, getWithDefault } = Ember;
const { hash }                  = Ember.RSVP;

export default Ember.Route.extend({
  model(params) {
    var { metadatum } = this.modelFor('merchant');
    return hash({
      articles: this.store.query('article',
        merge({ merchant: metadatum.id }, params)),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);

    controller.reopen({
      queryParams: ['page', 'count'],
      page:        getWithDefault(controller, 'page', 1),
    });
  },

  resetController(controller, isExiting)  {
    this._super(...arguments);
    if (isExiting) {
      controller.set('page', 1);
    }
  }
});
