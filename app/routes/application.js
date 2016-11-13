import Ember from 'ember';
import LoadingSliderMixin from '../mixins/loading-slider';

const { hash }  = Ember.RSVP;

export default Ember.Route.extend(
  LoadingSliderMixin,
  {
    model() {
      return hash({
        merchantMetadata: this.store.findAll('merchant/metadatum'),
      });
    },
  });
