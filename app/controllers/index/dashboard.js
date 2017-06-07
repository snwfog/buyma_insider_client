import Ember from "ember";
import ApplicationController from "../application";

const { computed } = Ember;

export default ApplicationController.extend({
  actions: {
    // TODO: Simplify this
    'confirmed'(articleSold) {
      articleSold.set('status', 'confirmed');
      return articleSold.save().catch((error) => articleSold.rollbackAttributes());
    },

    'shipped'(articleSold) {
      articleSold.set('status', 'shipped');
      return articleSold.save().catch((error) => articleSold.rollbackAttributes());
    },

    'cancelled'(articleSold) {
      articleSold.set('status', 'cancelled');
      return articleSold.save().catch((error) => articleSold.rollbackAttributes());
    },

    'received'(articleSold) {
      articleSold.set('status', 'received');
      return articleSold.save().catch((error) => articleSold.rollbackAttributes());
    },

    'returned'(articleSold) {
      articleSold.set('status', 'returned');
      return articleSold.save().catch((error) => articleSold.rollbackAttributes());
    },
  }
});
