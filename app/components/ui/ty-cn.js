import Ember from 'ember';

let UiTyCnComponent = Ember.Component.extend();

UiTyCnComponent.reopenClass({
  positionalParams: ['iconName'],
  iconName: '',
});

export default UiTyCnComponent.extend({
  tagName: 'span',
});


