import Ember from "ember";

const { computed: { alias }, assert } = Ember;

export default Ember.Controller.extend({
  metadatum: alias('merchant.metadatum'),
  actions:   {
    '_refreshIndexPage'(indexPage) {
      assert('Must have index page', !!indexPage);
      return this.store
          .createRecord('action/index-page/-refresh', { indexPage })
          .save()
          .catch((error) => {
            this.debug(arguments);
          });
    }
  }
});
