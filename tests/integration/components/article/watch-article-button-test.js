import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('article/watch-article-button', 'Integration | Component | article/watch article button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{article/watch-article-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#article/watch-article-button}}
      template block text
    {{/article/watch-article-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
