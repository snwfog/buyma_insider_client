import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user/article-watched', 'Unit | Serializer | user/article watched', {
  // Specify the other units that are required for this test.
  needs: ['serializer:user/article-watched']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
