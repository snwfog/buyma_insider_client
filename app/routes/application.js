import Ember from 'ember';
import DS from 'ember-data';
import LoadingSliderMixin from '../mixins/loading-slider';

const { merge, computed, RSVP: { all, hash } } = Ember;

export default Ember.Route.extend(
  LoadingSliderMixin, // Loading slider addon
  {
    // Bubble the loading option from the component
    // so that default ember loading mechanism still works
    bubbleLoadingSlider: true,

    beforeModel() {
      // return all([ this.get('exchangeRatesService').setup() ]);
      return new Ember.RSVP.Promise(function(resolve) { Ember.run.later(null, resolve, 100000)});
    },

    model() {
      let applicationModels = {
        merchants:   this.store.findAll('merchant'),
        oneDollar:   this.store.createRecord('money', { base: 'cad', amount: 1 }),
        oneUsDollar: this.store.createRecord('money', { base: 'usd', amount: 1 }),
        oneYen:      this.store.createRecord('money', { base: 'jpy', amount: 1 }),
      };

      if (!!this.currentUser) {
        let currentUserModels = {
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
    },

    error(error, transition) {
      if (error instanceof DS.UnauthorizedError) {
        this.replaceWith('login');
      }
    }
  });
