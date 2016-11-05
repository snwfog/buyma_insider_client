import { moduleForModel, test } from 'ember-qunit';

moduleForModel('merchant/crawl-session', 'Unit | Model | merchant/crawl session', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
