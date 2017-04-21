import Ember from "ember";
import config from "./config/environment";
import RouterScroll from "ember-router-scroll";

const Router = Ember.Router.extend(
  RouterScroll,
  {
    location: config.locationType,
    rootURL:  config.rootURL
  });

Router.map(function () {
  this.route('login');
  this.route('signup');

  this.route('status');
  this.route('articles', { path: '/articles/:article_id' }, function() {
    this.route('index');
  });

  this.route('merchant', { path: '/:merchant_id' }, function () {
    this.route('index');
    this.route('history');
    this.route('edit');
  });
  this.route('logout');

  this.route('user', function() {
    this.route('profile');
  });
});

export default Router;
