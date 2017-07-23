import Ember from "ember";
import User from "../models/user";

const { info } = Ember.Logger;

export function initialize(appInstance) {
//   const store         = appInstance.lookup('service:store');
  const messageBus = window.MessageBus;
  appInstance.register('message-bus:main', messageBus, { instantiate: false });
  appInstance.inject('route',      'messageBus', 'message-bus:main');
  appInstance.inject('controller', 'messageBus', 'message-bus:main');
  // Do not start anything till document is completed (discourse)

  const currentUser = User.current();
  appInstance.register('current-user:main', currentUser, { instantiate: false });
  appInstance.inject('route',      'currentUser', 'current-user:main');
  appInstance.inject('controller', 'currentUser', 'current-user:main');
  appInstance.inject('component',  'currentUser', 'current-user:main');
  appInstance.inject('ability',    'currentUser', 'current-user:main');

  appInstance.inject('adapter', 'debug', 'debug-logger:main');
}

export default {
  name:  '01-instance-injection',
  after: '00-bootstrap',
         initialize
};