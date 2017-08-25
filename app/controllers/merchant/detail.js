import Ember from 'ember';
import { extractError } from '../../lib/ajax-error';

const { computed: { alias }, assert } = Ember;

export default Ember.Controller.extend({
  metadatum: alias('merchant.metadatum'),
  actions:   {
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
          return this.store
            .findRecord('merchant/index-page', indexPage.id);
        });
    }
  }
});
