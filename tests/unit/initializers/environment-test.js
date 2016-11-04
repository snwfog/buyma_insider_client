import Ember from 'ember';
import EnvironmentInitializer from 'buyma-insider-client/initializers/environment';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | environment', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EnvironmentInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
