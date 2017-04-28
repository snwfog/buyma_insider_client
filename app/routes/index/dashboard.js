import Ember from "ember";

const { hash } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    const currentUser = this.currentUser;
    return hash({
      soldArticles: currentUser.get('soldArticles'),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
    controller.reopen({
      actions: {
        'confirmed'(soldArticle) {
          soldArticle.set('status', 'confirmed');
          return soldArticle.save().catch((error) => soldArticle.rollbackAttributes());
        },

        'shipped'(soldArticle) {
          soldArticle.set('status', 'shipped');
          return soldArticle.save().catch((error) => soldArticle.rollbackAttributes());
        },

        'cancelled'(soldArticle) {
          soldArticle.set('status', 'cancelled');
          return soldArticle.save().catch((error) => soldArticle.rollbackAttributes());
        },

        'received'(soldArticle) {
          soldArticle.set('status', 'received');
          return soldArticle.save().catch((error) => soldArticle.rollbackAttributes());
        },

        'returned'(soldArticle) {
          soldArticle.set('status', 'returned');
          return soldArticle.save().catch((error) => soldArticle.rollbackAttributes());
        },
      }
    });
  }
});
