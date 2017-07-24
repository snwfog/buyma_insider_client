import Ember from 'ember';
import { extractError } from '../../lib/ajax-error';

const { computed: { alias }, assert } = Ember;

export default Ember.Controller.extend({
  metadatum: alias('merchant.metadatum'),
  actions:   {
    '_refreshIndexPage'(indexPage) {
      assert('Must have index page', !!indexPage);
      return this.store
          .createRecord('action/index-page/-refresh', { indexPage })
          .save()
          .then(() => {
            return this.store
              .findRecord('merchant/index-page', indexPage.id); });
    }
  }
});
