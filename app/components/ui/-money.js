import Ember from "ember";
const { computed, inject } = Ember;

let UiMoneyComponent = Ember.Component.extend({
  tagName:    'span',
  classNames: 'component-ui-money is-semi-bold',

  amount:        null,
  // This is the widget base, could be different than
  // the actual amount base
  displayBase:   'cad',
  separator:     '.',
  showCode:      false,
  displayAmount: computed('amount', 'displayBase', function () {
    var amount      = this.get('amount');
    var amountBase  = this.get('amount.base') || 'cad';
    var displayBase = this.get('displayBase') || 'cad';

    var exchangeRatesService = this.get('exchangeRatesService');
    var { locale, code }     = exchangeRatesService.lookup(this.get('displayBase'));
    var convertedAmount      = exchangeRatesService.convertCurrency(amountBase, displayBase, amount.get('amount'));

    var formatter = new Intl.NumberFormat(locale, {
      style:    'currency',
      currency: code
    });

    return formatter.format(convertedAmount);
  }),
});

UiMoneyComponent.reopenClass({
  positionalParams: [ 'amount', 'displayBase' ],
});

export default UiMoneyComponent;
