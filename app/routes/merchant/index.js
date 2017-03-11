import Ember from "ember";

const { merge, getWithDefault } = Ember;
const { hash }                  = Ember.RSVP;

export default Ember.Route.extend({
  queryParams: {
    page:   { refreshModel: true },
    limit:  20,
    filter: { refreshModel: true },
  },

  model(params) {
    var { merchant } = this.modelFor('merchant');
    return hash({
                merchant,
      articles: this.store.query('article',
        merge({ merchant_id: merchant.id }, params)),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    var route = this;
    controller.setProperties(models);

    controller.reopen({
      queryParams: [ 'page', 'limit', 'filter' ],
//       page:        getWithDefault(controller, 'page', 1),
//       count:       getWithDefault(controller, 'count', 20),
//       filter:      getWithDefault(controller, 'filter', 'new'),
      page:        1,
      count:       20,
      filter:      'new',

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
      controller.set('filter', 'new');
    }
  },
});
