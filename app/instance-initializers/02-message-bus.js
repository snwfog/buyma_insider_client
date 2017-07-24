import Ember from 'ember';

const { info } = Ember.Logger;

export function initialize(appInstance) {
  const messageBus   = appInstance.lookup('message-bus:main');
  const store        = appInstance.lookup('service:store');
  const toastService = appInstance.lookup('service:toast');
  messageBus.subscribe('/crawl-histories', function (crawl_history_data) {
    toastService.success('Crawl history updated');
    store.pushPayload(crawl_history_data);
    info(`crawl_history ${crawl_history_data}`);
  });

  messageBus.subscribe('/merchants', function(merchant_data) {
    toastService.success('Merchant updated');
    store.pushPayload(merchant_data);
    info(`merchant: ${merchant_data}`);
  });

  messageBus.subscribe('/index-pages', function(index_page_data) {
    toastService.success('Index page updated');
    store.pushPayload(index_page_data);
    info(`index_page: ${index_page_data}`);
  });

  messageBus.subscribe('/user-article-notifieds', function(user_article_notified_data) {
    toastService.success('You just got a new notification');
    store.pushPayload(user_article_notified_data);
    info(`user_article_notifieds: ${user_article_notified_data}`);
  });
}

export default {
  name:  '02-message-bus',
  after: '01-instance-injection',
  initialize
};