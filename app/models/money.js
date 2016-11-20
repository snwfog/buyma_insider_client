import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { attr } = DS;

/**
 * Private non-serializable model
 */
var MoneyModel = DS.Model.extend({
  base:   attr(),
  amount: attr(),
  whole:  computed('amount', function () {
    var amount = this.get('amount');
    return Math.floor(Number(amount));
  }),

  change: computed('amount', function () {
    var amount  = this.get('amount');
    var decimal = Math.floor(Number(amount) * 100) % 100;
    return decimal < 10 ? '0' + decimal : decimal;
  }),

  save() {
    Ember.assert('Money model cannot be saved', false);
  }
});

export default MoneyModel;
