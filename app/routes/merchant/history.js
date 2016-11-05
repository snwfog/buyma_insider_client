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

  renderTemplate() {
    this.render('merchant/history', {
      into: 'merchant',
    });
  },
});
