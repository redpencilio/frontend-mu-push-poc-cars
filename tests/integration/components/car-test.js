import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | car', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Car />`);

    assert.equal(this.element.textContent.trim(), 'Brand: \nModel:');

    this.set('car', {
      brand: 'test-brand',
      model: 'test-model',
    });

    // Template block usage:
    await render(hbs`
      <Car @car={{car}}>
        template block text
      </Car>
    `);

    assert.equal(
      this.element.textContent.trim(),
      'Brand: test-brand\nModel: test-model'
    );
  });
});
