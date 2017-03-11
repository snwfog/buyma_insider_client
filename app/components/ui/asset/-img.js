import Ember from 'ember';
import config from '../../../config/environment';

const { computed } = Ember;

var UiAssetImgComponent = Ember.Component.extend({
  tagName:           'img',
  attributeBindings: 'src'.w(),

  _src: null,
  src:  computed(function() {
//    return `${config.APP.SERVER.endpoint}/${this.get('_href')}`;
    return `/${this.get('_src')}`;
  }),
});

UiAssetImgComponent.reopenClass({
  positionalParams: '_src'.w(),
});

export default UiAssetImgComponent;
