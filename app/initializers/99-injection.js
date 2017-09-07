export function initialize(application) {
  // Store injection
  application.inject('transform',  'store', 'service:store');
  // Backend application state service
  application.inject('route',      'applicationService', 'service:application');
  application.inject('controller', 'applicationService', 'service:application');

//   var exchangeRatesService = ExchangeRatesService.create();
//   application.register('service:exchange-rates', exchangeRatesService, { instantiate: false })
  application.inject('route',      'exchangeRatesService', 'service:exchange-rates');
  application.inject('controller', 'exchangeRatesService', 'service:exchange-rates');
  application.inject('component',  'exchangeRatesService', 'service:exchange-rates');

    // Toast service
  application.inject('model',      'toastService', 'service:toast');
  application.inject('route',      'toastService', 'service:toast');
  application.inject('controller', 'toastService', 'service:toast');


//   application.inject('route',      'currentUserService', 'service:current-user');
//   application.inject('controller', 'currentUserService', 'service:current-user');
}

export default {
  name:  '99-injection',
  after: '03-message-bus',
         initialize
};
