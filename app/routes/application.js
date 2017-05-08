import Ember from "ember";
import LoadingSliderMixin from "../mixins/loading-slider";

const { all, hash }  = Ember.RSVP;

export default Ember.Route.extend(
  LoadingSliderMixin, // Loading slider addon
  {
    // Bubble the loading option so that we can restore original ember loading
    bubbleLoadingSlider: true,
    beforeModel() {
      return all([ this.get('exchangeRatesService').setup() ]);
    },

    model() {
      return hash({
        merchants:   this.store.findAll('merchant'),
        oneDollar:   this.store.createRecord('money', { base: 'cad', amount: 1 }),
        oneUsDollar: this.store.createRecord('money', { base: 'usd', amount: 1 }),
        oneYen:      this.store.createRecord('money', { base: 'jpy', amount: 1 }),
      });
    },

    setupController(controller, models) {
      this._super(...arguments);
      controller.setProperties(models);
    }
  });
