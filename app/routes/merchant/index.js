import Ember from "ember";

const { merge, getWithDefault } = Ember;
const { hash }                  = Ember.RSVP;

export default Ember.Route.extend({
  queryParams: {
    page:   { refreshModel: true },
    count:  { refreshModel: true },
    filter: { refreshModel: true },
  },

  model(params) {
    var { metadatum } = this.modelFor('merchant');
    return hash({
                metadatum,
      articles: this.store.query('article',
        merge({ merchant: metadatum.get('name') }, params)),
    });
  },

  setupController(controller, models, transition) {
    this._super(...arguments);
    var route       = this;
    var queryParams = transition.queryParams;

    controller.setProperties(models);
    controller.reopen({
      queryParams: ['page', 'count', 'filter'],
      page:        getWithDefault(queryParams, 'page', 1),
      count:       getWithDefault(queryParams, 'count', 20),
      filter:      getWithDefault(queryParams, 'filter', 'new'),

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
      controller.set('count', 20);
      controller.set('filter', 'new');
    }
  },
});
