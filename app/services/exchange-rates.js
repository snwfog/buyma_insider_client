import Ember from "ember";
import moment from "moment";

const { inject, RSVP, run, computed } = Ember;

export default Ember.Service.extend({
  RATES:      'jpy cad usd'.w(),
  CURRENCIES: [ {
    country: 'Japan',
    locale:  'ja-JP',
    code:    'jpy',
    symbol:  '¥'
  }, {
    country: 'Canada',
    locale:  'en-CA',
    code:    'cad',
    symbol:  '$'
  }, {
    country: 'United States',
    locale:  'en-US',
    code:    'usd',
    symbol:  '$'
  } ],

  LOOKUP: computed('CURRENCIES', function () {
    return this.get('CURRENCIES').reduce(function (m, n) {
      m[ n.code ] = n;
      return m;
    }, {});
  }),

  EXPIRES_IN: 3600, // expires in 1 hour in seconds

  exchangeRates: null,
  latest:        computed.alias('exchangeRates'),
  store:         inject.service('store'),

//   init() {
//     this._super(...arguments);
//     this.updateRates();
//   },

  setup() {
    return this.get('store')
      .queryRecord('exchange-rate', { _latest: true })
      .then((latestRates) => {
        this.set('exchangeRates', latestRates);
        this.debug(`Latest exchange rates updated on ${moment().local().toString()}`)
        run.later(this, this.updateRates, null, 3600 * 1000);
        return latestRates;
      });
  },

  lookup(code) {
    return this.get(`LOOKUP.${code}`);
  },

  updateRates() {
//     var exchangeRates = this.get('exchangeRates');
    run.once(this, this.setup);
    // If the previous rate was fetched,
    // then just return the previous rates
    // Its OK to have a bit expired, next fetch
    // would be the latest rate
//     if (!!exchangeRates) {
//       return exchangeRates;
//     }
    // var store = getOwner(this).lookup('service:store');
//     if (!exchangeRates || exchangeRates.get('expired?')) {
//     } else {
//       return RSVP.resolve(exchangeRates);
//     }
  },

  convertCurrency(from, to, amount = 1, rate) {
    if (from === to) {
      return amount;
    }

    let exchangeRates = rate || this.get('latest');
    let exchangeBase  = exchangeRates.get('base').toLowerCase();
    if (from === exchangeBase) {
      return exchangeRates.get(`rates.${to}`) * amount;
    } else {
      let fromRate    = exchangeRates.get(`rates.${from}`);
      let toRate      = exchangeRates.get(`rates.${to}`);
      let newBaseRate = toRate / Number(fromRate);
      return newBaseRate * amount;
    }
  },

  jpy2cad(jap) {
    return this.convertCurrency('jpy', 'cad', jap);
  },

  cad2jpy(cad) {
    return this.convertCurrency('cad', 'jpy', cad);
  },

  usd2cad(usd) {
    return this.convertCurrency('usd', 'cad', usd);
  },

  cad2usd(cad) {
    return this.convertCurrency('cad', 'usd', cad);
  },

  usd2jpy(usd) {
    return this.convertCurrency('usd', 'jpy', usd);
  },

  jpy2usd(jpy) {
    return this.convertCurrency('jpy', 'usd', jpy);
  },

});
