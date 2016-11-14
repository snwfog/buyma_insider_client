import Ember from 'ember';
const { computed } = Ember;

let UiMoneyComponent = Ember.Component.extend({
  tagName:   'span',
  separator: '.',
  whole:     computed('amount', function() {
    var amount = this.get('amount');
    return Math.floor(Number(amount));
  }),

  change: computed('amount', function() {
    var amount = this.get('amount');
    var decimal = Math.floor(Number(amount) * 100) % 100;
    return decimal < 10 ? '0' + decimal : decimal;
  }),
});

UiMoneyComponent.reopenClass({
  positionalParams: ['amount'],
});

export default UiMoneyComponent;
