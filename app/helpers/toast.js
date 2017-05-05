import Ember from "ember";

export default Ember.Helper.extend({
  toastService: Ember.inject.service('toast'),

  compute([message, type = 'log']) {
    const toastService = this.get('toastService');
    return function () { toastService[ type ](message); };
  }
});

