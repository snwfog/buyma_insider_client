import Ember from "ember";

const { merge, getWithDefault } = Ember;
const { hash }                  = Ember.RSVP;

export default Ember.Route.extend({
  queryParams: {
    page:   { refreshModel: true },
//     limit:  20,
    count:  { refreshModel: true },
    filter: { refreshModel: true },
  },

  model(params) {
    var { merchant } = this.modelFor('merchant');
    return hash({
                 merchant,
      metadatum: merchant.get('metadatum'),
      articles:  this.store.query('article', merge({ merchant_id: merchant.id }, params)),
    });
  },

  setupController(controller, models, transition) {
    this._super(...arguments);
    var route       = this;
    controller.setProperties(models);

    var queryParams = transition.queryParams;
    controller.reopen({
      queryParams: [ 'page', 'limit', 'filter' ],
      page:        getWithDefault(queryParams, 'page', 1),
      limit:       getWithDefault(queryParams, 'limit', 20),
      filter:      getWithDefault(queryParams, 'filter', 'all'),

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
      controller.set('limit', 20);
      controller.set('filter', 'all');
    }
  },
});
