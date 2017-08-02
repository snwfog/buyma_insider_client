import Ember from 'ember';
import EmberMaterialIcon from '../material-icon';

export default EmberMaterialIcon.extend({
  // forces bulma.css to recognize this icon set
  // since bulma is hardcoded with fa html class
  classNames: ['fa'],
//  layoutName: 'components/material-icon',
});
