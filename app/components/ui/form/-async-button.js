import Ember from "ember";
import EmberAsyncButtonComponent from "ember-async-button/components/async-button";
import layout from "ember-async-button/templates/components/async-button";

const { equal } = Ember.computed;

export default EmberAsyncButtonComponent.extend({
  layout,
  tagName:           'a',
  classNameBindings: [
    'isLoading:is-loading',
    // 'isRejected:is-outlined',
    'isRejected:is-danger',
    // 'isFulfilled:is-outlined',
    'isFulfilled:is-success',
//     'isFulfilled:is-disabled',
//     'isResolved:is-outlined',
    'isResolved:is-success',
    'isResolved:is-disabled',
  ],

  isLoading:   equal('textState', 'pending'),
  isRejected:  equal('textState', 'rejected'),
  isFulfilled: equal('textState', 'fulfilled'),
  isResolved:  equal('textState', 'resolved'),
});
