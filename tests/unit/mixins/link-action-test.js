import Ember from 'ember';
import LinkActionMixin from 'buyma-insider-client/mixins/link-action';
import { module, test } from 'qunit';

module('Unit | Mixin | link action');

// Replace this with your real tests.
test('it works', function(assert) {
  let LinkActionObject = Ember.Object.extend(LinkActionMixin);
  let subject = LinkActionObject.create();
  assert.ok(subject);
});
