import Ember from 'ember';
import config from '../config/environment';

const { info } = Ember.Logger;

export function initialize(application) {
  const messageBus = window.MessageBus;
  messageBus.stop();

  // Start MessageBus only when application is loaded
  application.reopen({
    ready() {
      this._super(...arguments);
      messageBus.baseUrl = config.messageBus.backend + '/';
      messageBus.enableLongPolling = false; // disable long polling, webrick does not support partial rack hijack
      messageBus.start();
      info('MessageBus started...');
    }
  });
}

export default {
  name:  '03-message-bus',
  after: '02-environment',
  initialize
};