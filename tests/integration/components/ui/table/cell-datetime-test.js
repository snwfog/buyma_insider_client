import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/table/cell-datetime', 'Integration | Component | ui/table/cell datetime', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/table/cell-datetime}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui/table/cell-datetime}}
      template block text
    {{/ui/table/cell-datetime}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
