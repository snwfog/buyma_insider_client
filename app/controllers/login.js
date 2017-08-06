import Ember from "ember";
import ApplicationController from "./application";

export default ApplicationController.extend({
  login:               '',
  password:            '',
  // Always show hidden logging form for
  // whatever reason this page is rendered
  // while the currentUser exists, so that
  // user can login again, and be redirected
  showHiddenLoginForm: true,
  actions:             {
    login(login, password) {
      this.debug(login, password);
      return this.store
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
