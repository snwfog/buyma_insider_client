import Ember from "ember";

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    const currentUser = this.currentUser;
    return hash({
      articleSolds: currentUser.get('articleSolds'),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
    controller.reopen({
      actions: {
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
  }
});
