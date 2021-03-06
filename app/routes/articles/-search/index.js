import Ember from 'ember';

const { merge, getWithDefault, computed } = Ember;
const { hash }                            = Ember.RSVP;
const { warn }                            = Ember.Logger;

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
    let articlesModel    = this.modelFor('articles');
    let applicationModel = this.modelFor('application');
    let searchedArticles = {};
    if (!!params.q) {
      searchedArticles = this.store.query('article', params);
    }

    return hash(merge({ searchedArticles }, applicationModel, articlesModel));
//     return new Ember.RSVP.Promise((resolve) => Ember.run.later(null, resolve, 1000000));
  },

  setupController(controller, models, transition) {
    this._super(...arguments);
    let route       = this;
    let queryParams = transition.queryParams;
    controller.setProperties(models);
    controller.reopen({
      queryParams:                    [ 'q', 'page', 'count', 'order', 'extension' ],
      q:                              getWithDefault(queryParams, 'q', ''),
      page:                           getWithDefault(queryParams, 'page', 1),
      limit:                          getWithDefault(queryParams, 'limit', 20),
//       filter:      getWithDefault(queryParams, 'filter', 'all'),
      order:                          getWithDefault(queryParams, 'order', 'created_at:desc'),
      extension:                      getWithDefault(queryParams, 'extension', '_search'),
      searchedArticlesOrderedByScore: computed('searchedArticles.[]', function () {
        let searchedArticleScores = this.get('searchedArticles.meta.scores');
        let store                 = this.store;
        return searchedArticleScores.map(function (articleScoreDocument) {
          let articleId = articleScoreDocument[ 'article-id' ];
          let article   = store.peekRecord('article', articleId);
          if (!article) {
            warn(`Article ${articleId} was returned by search but was not included in the response, this is due to Elasticsearch returning deleted database documents`);
            return null;
          } else {
            return {
              article,
              score: articleScoreDocument[ 'score' ],
            };
          }
        });
      }),

      actions: {
        '_pageChanged'(nextPage, currPage) {
          this.debug(`Page changed ${currPage} -> ${nextPage}`);
          controller.set('page', nextPage);
          route.transitionTo({ queryParams: { page: nextPage } });
        }
      }
    });
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('q', '');
      controller.set('page', 1);
      controller.set('limit', 20);
//      controller.set('filter', 'all');
      controller.set('order', 'created_at:desc');
      controller.set('extension', '_search');
    }

    return this._super(...arguments);
  }
});
