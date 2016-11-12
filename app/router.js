import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL:  config.rootURL
});

Router.map(function() {
  this.route('status');
  this.route('articles', { path: '/articles/:article_id' });
  this.route('merchant', { path: '/:merchant_metadatum_id' }, function() {
    this.route('index');
    this.route('history');
  });
});

export default Router;
