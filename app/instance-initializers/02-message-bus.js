import Ember from "ember";

const { info } = Ember.Logger;

export function initialize(appInstance) {
  const messageBus = appInstance.lookup('message-bus:main');
  messageBus.subscribe('/crawl-history', function(data) {
    info('crawled');
  });
}

export default {
  name:  '02-message-bus',
  after: '01-instance-injection',
  initialize
};