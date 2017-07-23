import Ember from 'ember';

const { info } = Ember.Logger;

export function initialize(appInstance) {
  const messageBus   = appInstance.lookup('message-bus:main');
  const store        = appInstance.lookup('store:main');
  const toastService = appInstance.lookup('service:toast');
  messageBus.subscribe('/crawl-histories', function (data) {
    toastService.success('Crawl history updated');
    info(`crawled ${data}`);
  });

  messageBus.subscribe('/merchants', function(merchant_data) {
    toastService.success('Merchant updated');
    store.pushPayload(merchant_data);
  });

  messageBus.subscribe('/index-pages', function(index_page_data) {
    toastService.success('Index page updated');
    store.pushPayload(index_page_data);
  })
}

export default {
  name:  '02-message-bus',
  after: '01-instance-injection',
  initialize
};