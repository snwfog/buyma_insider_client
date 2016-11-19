import Ember from 'ember';

const { merge, getWithDefault } = Ember;
const { hash }                  = Ember.RSVP;

export default Ember.Route.extend({
  queryParams: {
    page: { refreshModel: true },
  },

  model(params) {
    var { metadatum } = this.modelFor('merchant');
    return hash({
      articles: this.store.query('article',
        merge({ merchant: metadatum.id }, params)),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    var route = this;
    controller.setProperties(models);

    controller.reopen({
      queryParams: ['page', 'count'],
      page:        getWithDefault(controller, 'page', 1),

      actions: {
        '_pageChanged'(nextPage, currPage) {
          this.debug(`Page changed ${currPage} -> ${nextPage}`);
          controller.set('page', nextPage);
          route.transitionTo({ queryParams: { page: nextPage } });
        }
      }
    });
  },

  resetController(controller, isExiting)  {
    this._super(...arguments);
    if (isExiting) {
      controller.set('page', 1);
    }
  },
});
