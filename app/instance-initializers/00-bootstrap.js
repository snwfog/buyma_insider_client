import User from "../models/user";

export function initialize(appInstance) {
  window.BuymaInsider = appInstance;

//   const store         = appInstance.lookup('service:store');
  const currentUser = User.current();
  appInstance.register('current-user:main', currentUser, { instantiate: false });
  appInstance.inject('route',      'currentUser', 'current-user:main');
  appInstance.inject('controller', 'currentUser', 'current-user:main');
  appInstance.inject('component',  'currentUser', 'current-user:main');
  appInstance.inject('ability',  'currentUser', 'current-user:main');

  appInstance.inject('adapter', 'debug', 'debug-logger:main');
}

export default {
  name:  '00-bootstrap',
  after: 'ember-data',
         initialize
};
