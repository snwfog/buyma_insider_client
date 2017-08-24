import Ember from 'ember';
import ApplicationController from './application';

const { hash }     = Ember.RSVP;
const { computed } = Ember;

export default ApplicationController.extend({
  searchArticles: [],

  articlesAutocomplete: computed('searchArticles.[]', function (completes) {
    return completes.inject((prev, item) => {
      prev.concat(item);
    }, []);
  }),

  actions: {
//         '_searchArticles'() {
//           var q     = this.get('inputSearchArticleQuery');
//           if (!q) {
//             return Ember.RSVP.reject();
//           }
//
//           var queryParams = { q, extension: '_search' };
//           return this.transitionToRoute('articles._search.index', { queryParams });
//           return this.store
//             .query('article', query)
//             .then(function (articles) {
//               controller.set('searchArticles', articles.get('meta.autocompletes')); });
//         }
  }
});
