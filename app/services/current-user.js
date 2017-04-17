import Ember from "ember";

export default Ember.Service.extend({
  login(login, password) {
    this.store
      .createRecord('session', { login, password })
      .then((response) => {
        this.debug(response);
      });
  },

  currentUser: null,
  current() {

  }
});
