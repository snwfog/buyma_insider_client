import debugLogger from 'ember-debug-logger';

export function initialize(application) {
  application.inject('adapter', 'debug', 'debug-logger:main');
}

export default {
  name: '02-inject-services',
        initialize
};
