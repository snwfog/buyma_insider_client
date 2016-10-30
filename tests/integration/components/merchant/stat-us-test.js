import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('merchant/stat-us', 'Integration | Component | merchant/stat us', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{merchant/stat-us}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#merchant/stat-us}}
      template block text
    {{/merchant/stat-us}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
