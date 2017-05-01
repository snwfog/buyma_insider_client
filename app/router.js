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

  this.route('index', function() {
    this.route('dashboard');
    this.route('dashboard_archive', { path: '/archive' });
  });

  this.route('status');
  this.route('articles', { path: '/articles/:article_id' }, function() {
    this.route('index');
    this.route('sold', { path: '/sold/:user_sold_article_id' });
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
  this.route('calculator');
});

export default Router;
