import Ember from 'ember';
import SingletonMixin from 'buyma-insider-client/mixins/singleton';
import { module, test } from 'qunit';

module('Unit | Mixin | singleton');

// Replace this with your real tests.
test('it works', function(assert) {
  let SingletonObject = Ember.Object.extend(SingletonMixin);
  let subject = SingletonObject.create();
  assert.ok(subject);
});
