import Ember from "ember";

export default Ember.Component.extend({
  tagName:    'p',
  classNames: 'control',

  article: null,
  actions: {
    watch() {
      return this.attrs.watch();
    }
  }
});
