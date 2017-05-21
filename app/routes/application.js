import Ember from "ember";
import LoadingSliderMixin from "../mixins/loading-slider";

const { merge, computed, RSVP: { all, hash } } = Ember;

export default Ember.Route.extend(
  LoadingSliderMixin, // Loading slider addon
  {
    // Bubble the loading option so that we can restore original ember loading
    bubbleLoadingSlider: true,
    beforeModel() {
      return all([ this.get('exchangeRatesService').setup() ]);
    },

    model() {
      let applicationModels = {
        merchants:   this.store.findAll('merchant'),
        oneDollar:   this.store.createRecord('money', { base: 'cad', amount: 1 }),
        oneUsDollar: this.store.createRecord('money', { base: 'usd', amount: 1 }),
        oneYen:      this.store.createRecord('money', { base: 'jpy', amount: 1 }),
      };

      if (!!this.currentUser) {
        var currentUserModels = {
          articleNotifieds: this.currentUser.get('articleNotifieds'),
        };

        merge(applicationModels, currentUserModels);
      }

      return hash(applicationModels);
    },

    // has own controller
    setupController(controller, models) {
      controller.setProperties(models);
      return this._super(...arguments);
    }
  });
