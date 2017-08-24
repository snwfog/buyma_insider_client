import Ember from 'ember';
import moment from 'moment';
import array from 'ember-awesome-macros/array';

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model(params, transition) {
    let { oneDollar, oneUsDollar, oneYen } = this.modelFor('application');
    return hash({
      oneDollar,
      oneUsDollar,
      oneYen,
      exchangeRates: this.store.query('exchange-rate', { limit: 20 })
    });
  },

  // has controller
  setupController(controller, models) {
    controller.setProperties(models);
    controller.reopen({
      sortedExchangeRates: array.sort('exchangeRates',
        (a, b) => moment.compare(b.get('timestamp'), a.get('timestamp'))),
    })
    return this._super(...arguments);
  }
});
