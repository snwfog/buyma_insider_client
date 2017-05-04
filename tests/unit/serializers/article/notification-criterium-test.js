import { moduleForModel, test } from 'ember-qunit';

moduleForModel('article/notification-criterium', 'Unit | Serializer | article/notification criterium', {
  // Specify the other units that are required for this test.
  needs: ['serializer:article/notification-criterium']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
