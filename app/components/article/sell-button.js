import Ember from "ember";

export default Ember.Component.extend({
  tagName:    'p',
  classNames: 'control',

  article: null,
  actions: {
    sell() {
      return this.attrs.sell();
    }
  }
});
