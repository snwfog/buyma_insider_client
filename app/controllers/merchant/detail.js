import Ember from 'ember';
import { extractError } from '../../lib/ajax-error';

const { computed: { alias }, assert } = Ember;

export default Ember.Controller.extend({
  metadatum: alias('merchant.metadatum'),
  actions:   {
    '_updateIndexPage'(selection, value) {
      this.debug(selection, value);
    },

    '_groomIndexPages'(merchant) {
      return this.store
        .createRecord('action/merchants/-groom-index-pages', { merchant })
        .save();
    },

    '_refreshIndexPage'(indexPage) {
      assert('Must have index page', !!indexPage);
      return this.store
        .createRecord('action/index-pages/-refresh', { indexPage })
        .save()
        .then(() => {
          // TODO: Refresh the index page properly
          // TODO: Is it even necessary to refresh/reload?
          return this.store
            .findRecord('merchant/index-page', indexPage.id);
        });
    }
  }
});
