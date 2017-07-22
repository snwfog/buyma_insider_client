import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

const { computed } = Ember;
const { attr } = DS;

/**
 * Private non-serializable model
 */
let MoneyModel = DS.Model.extend({
  base:   attr(),
  amount: attr(),

  whole:  computed('amount', function () {
    var amount = this.get('amount');
    return Math.floor(Number(amount));
  }),

  isCad: computed.equal('base', config.APP.CURRENCIES.CAD),
  isJpy: computed.equal('base', config.APP.CURRENCIES.JPY),
  isUsd: computed.equal('base', config.APP.CURRENCIES.USD),

  change: computed('amount', function () {
    let amount  = this.get('amount');
    let decimal = Math.floor(Number(amount) * 100) % 100;
    return decimal < 10 ? '0' + decimal : decimal;
  }),

  save() {
    Ember.assert('Money model cannot be saved', false);
  }
});

export default MoneyModel;
