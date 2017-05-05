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
  this.route('logout');
  this.route('signup');
  this.route('search');
  this.route('estimator');

  this.route('dashboard');
  this.route('dashboard_archive', { path: '/archive' }, function() {
    this.route('year',    { path: '/year/:year_id'   }, function() {
      this.route('month', { path: '/month/:month_id' }, function() {
        this.route('day', { path: '/day/:day_id'     });
      });
    });
  });

  this.route('status');
  this.route('articles', { path: '/articles/:article_id' }, function() {
//     this.route('index');
    this.route('sold', { path: '/sold/:user_article_sold_id' });
  });

  this.route('merchant', { path: '/:merchant_id' }, function () {
//     this.route('index');
    this.route('history');
    this.route('edit');
  });

  this.route('user', function() {
    this.route('profile');
  });
});

export default Router;
