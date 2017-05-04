import { moduleForModel, test } from 'ember-qunit';

moduleForModel('article/notification-criterium/discount-percent', 'Unit | Serializer | article/notification criterium/discount percent', {
  // Specify the other units that are required for this test.
  needs: ['serializer:article/notification-criterium/discount-percent']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
