import { moduleForModel, test } from 'ember-qunit';

moduleForModel('action/index-page/-refresh', 'Unit | Serializer | action/index page/ refresh', {
  // Specify the other units that are required for this test.
  needs: ['serializer:action/index-page/-refresh']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
