import Ember from "ember";

const { info } = Ember.Logger;

export function initialize(application) {
  const messageBus = window.MessageBus;
  messageBus.stop();

  // Start MessageBus only when application is loaded
  application.reopen({
    ready() {
      this._super(...arguments);
      messageBus.start();
      info("MessageBus started...");
    }
  });
}

export default {
  name:  '04-message-bus',
  after: '03-injection',
  initialize
};