import Ember from 'ember';

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    var { merchant } = this.modelFor('merchant');
    return hash({
                     merchant,
      crawlSessions: merchant.get('crawlSessions'),
    });
  },
  

  setupController(ctrl, { metadatum, crawlSessions }) {
    this._super(...arguments);
    let articlesCountSeries = crawlSessions
      .sortBy('startedAt')
      .reverse()
      .slice(0, 20)
      .map((crawlSession) => {
        var { articlesCount, invalidArticlesCount } = crawlSession.getProperties('itemsCount', 'invalidItemsCount');
        return `${articlesCount}:${invalidArticlesCount}`;
      });

    ctrl.set('articlesCountSeries', articlesCountSeries);
  },

  renderTemplate() {
    this.render('merchant/history', {
      into: 'merchant',
    });
  },
});
