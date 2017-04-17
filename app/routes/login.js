import Ember from "ember";

export default Ember.Route.extend({
  setupController(controller) {
    this._super(...arguments);
    controller.reopen({
      login:    '',
      password: '',
      actions:  {
        login(login, password) {
          this.debug(login, password);
          this.store
            .createRecord('session', { login, password })
            .save()
            .then((session) => {
              const $hidden_login_form = Ember.$('#hidden-login-form'); // or just '$', its present
              $hidden_login_form.find('input[name=username]').val(login);
              $hidden_login_form.find('input[name=password]').val(password);
              $hidden_login_form.submit();
            });
        }
      },
    });
  },

});
