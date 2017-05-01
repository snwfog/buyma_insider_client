import Ember from "ember";

export default Ember.Helper.extend({
  toastService: Ember.inject.service('toast'),

  compute(params, hash) {
    const toastService = this.get('toastService');
    return function () {
      toastService.success(`Selected! ${params}, ${hash}`);
    };
  }
});

