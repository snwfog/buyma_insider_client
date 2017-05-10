import Ember from "ember";

const { merge, getWithDefault } = Ember;
const { hash }                  = Ember.RSVP;

export default Ember.Route.extend({
  queryParams: {
    q:         { refreshModel: true },
    page:      { refreshModel: true },
    count:     { refreshModel: true },
    order:     { refreshModel: true },
    extension: { refreshModel: true }, // Use for server to transfer endpoint
//     limit:  20,
//     filter:    { refreshModel: true },
  },

//   beforeModel(transition) {
//
//   },

  model(params, transition) {
    var articlesModel    = this.modelFor('articles');
    var applicationModel = this.modelFor('application');
    var searchArticles   = {};
    if (!!params.q) {
      searchArticles = this.store.query('article', params);
    }

    return hash(merge({ searchArticles }, applicationModel, articlesModel));
//     return new Ember.RSVP.Promise((resolve) => Ember.run.later(null, resolve, 1000000));
  },

  setupController(controller, models, transition) {
    this._super(...arguments);
    controller.setProperties(models);
    var queryParams = transition.queryParams;
//     controller.set('inputSearchArticleQuery', getWithDefault(queryParams, 'q', ''));
    controller.reopen({
      queryParams: [ 'q', 'page', 'count', 'order', 'extension' ],
      q:           getWithDefault(queryParams, 'q', ''),
      page:        getWithDefault(queryParams, 'page', 1),
      limit:       getWithDefault(queryParams, 'limit', 20),
//       filter:      getWithDefault(queryParams, 'filter', 'all'),
      order:       getWithDefault(queryParams, 'order', 'created_at:desc'),
      extension:   getWithDefault(queryParams, 'extension', '_search'),
      actions: {
        '_pageChanged'() {

        }
      }
    });
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('q', '');
      controller.set('page', 1);
      controller.set('limit', 20);
//       controller.set('filter', 'all');
      controller.set('order', 'created_at:desc');
      controller.set('extension', '_search');
    }

    return this._super(...arguments);
  }
});