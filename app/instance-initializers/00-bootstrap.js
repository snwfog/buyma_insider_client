export function initialize(appInstance) {
  window.BuymaInsider = appInstance;
}

export default {
  name:  '00-bootstrap',
  after: 'ember-data',
         initialize
};
