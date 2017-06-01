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
  this.route('status');
  this.route('signup');
  this.route('notification');
  this.route('estimator');

  this.route('index', { path: '/' }, function () {
    this.route('hello');
    this.route('dashboard');
    this.route('dashboard-archive', { path: '/archive' }, function () {
      this.route('index', { path: '/' });

      // archives
      this.route('year', { path: '/year' }, function () {
        this.route('overview');         // all years overview
        this.route('index', { path: '/:year' }, function () {
          this.route('overview');       // year_overview
          this.route('month', { path: '/month' }, function () {
            this.route('overview');     // all months overview
            this.route('index', { path: '/:month' }, function () {
              this.route('overview');   // month_overview
              this.route('day', { path: '/day/:day' }, function () {
                this.route('overview'); // day_overview
              }); }); }); }); }); }); });

  this.route('articles', { path: '/articles' }, function () {
    this.route('_search', function () {
      this.route('index', { path: '/' }); });

    this.route('article', { path: '/:article_id' }, function () {
      this.route('index', { path: '/' }, function () {
        this.route('information');
        this.route('history'); });

      this.route('sold', { path: '/sold/:user_article_sold_id' }); }); });

  this.route('merchant', { path: '/m/:merchant_id' }, function () {
    this.route('index', { path: '/' });
    this.route('history');
    this.route('detail'); });

  this.route('user', function () {
    this.route('profile', function () {
      this.route('index', { path: '/' }, function () { }); }); });
});

export default Router;
