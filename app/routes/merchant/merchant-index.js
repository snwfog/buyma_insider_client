import Ember from 'ember';

const { merge, getWithDefault } = Ember;
const { hash }                  = Ember.RSVP;

export default Ember.Route.extend({
  queryParams: {
    page:   { refreshModel: true },
//     limit:  20,
    count:  { refreshModel: true },
    filter: { refreshModel: true },
    order:  { refreshModel: true },
  },

  model(params) {
    let { merchant } = this.modelFor('merchant');
    return hash({
                 merchant,
      metadatum: merchant.get('metadatum'),
      articles:  this.store.query('article', merge({ merchant_id: merchant.id }, params)),
    });
  },

  setupController(controller, models, transition) {
    this._super(...arguments);
    let route       = this;
    let queryParams = transition.queryParams;
    controller.setProperties(models);
    controller.reopen({
      queryParams: [ 'page', 'limit', 'filter' ],
      page:        getWithDefault(queryParams, 'page',   1),
      limit:       getWithDefault(queryParams, 'limit',  20),
      order:       getWithDefault(queryParams, 'order',  'created_at:desc'),
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
      controller.set('order', 'created_at:desc');
    }
  },
});
