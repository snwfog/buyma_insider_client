import ExchangeRatesService from "../services/exchange-rates";

export function initialize(application) {
  application.inject('adapter', 'debug', 'debug-logger:main');

//   var exchangeRatesService = ExchangeRatesService.create();
//   application.register('service:exchange-rates', exchangeRatesService, { instantiate: false })
  application.inject('route',     'exchangeRatesService', 'service:exchange-rates');
  application.inject('component', 'exchangeRatesService', 'service:exchange-rates');
}

export default {
  name: '02-inject-services',
        initialize
};
