import Ember from "ember";

const { info } = Ember.Logger;

export default Ember.Route.extend({
  setupController(ctrl) {
    ctrl.reopen({
      actions: {
        '_logout'() {
          this.debug('Submitting logout...');
          const $hidden_logout_form = Ember.$('#hidden-logout-form');
          Ember.assert('Must have logout form', !!$hidden_logout_form);
          $hidden_logout_form.submit();
        }
      }
    });
    return this._super(...arguments);
  },

  actions: {
    didTransition() {
      info('Logging out...');
      this.controller.send('_logout');
      return this._super(...arguments);
    }
  }
});
