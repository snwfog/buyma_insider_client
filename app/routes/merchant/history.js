import Ember from 'ember';

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    var { metadatum } = this.modelFor('merchant');
    return hash({
                     metadatum,
      crawlSessions: this.store.query('merchant/crawl_session', { merchant: metadatum.id }),
    });
  },

  setupController(ctrl, { metadatum, crawlSessions }) {
    this._super(...arguments);
    let itemsCountSeries = crawlSessions
      .sortBy('startedAt')
      .reverse()
      .slice(0, 20)
      .map((crawlSession) => {
        var { itemsCount, invalidItemsCount } = crawlSession.getProperties('itemsCount', 'invalidItemsCount');
        return `${itemsCount}:${invalidItemsCount}`;
      });

    ctrl.set('itemsCountSeries', itemsCountSeries);
  },

  renderTemplate() {
    this.render('merchant/history', {
      into: 'merchant',
    });
  },
});
