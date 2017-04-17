export function initialize(application) {

//   var exchangeRatesService = ExchangeRatesService.create();
//   application.register('service:exchange-rates', exchangeRatesService, { instantiate: false })
  application.inject('route', 'exchangeRatesService', 'service:exchange-rates');
  application.inject('component', 'exchangeRatesService', 'service:exchange-rates');

//   application.inject('route',      'currentUserService', 'service:current-user');
//   application.inject('controller', 'currentUserService', 'service:current-user');
}

export default {
  name:  '02-inject',
  after: '01-environment',
         initialize
};
