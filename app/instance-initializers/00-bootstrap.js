import PreloadStore from "../preload-store";

export function initialize(appInstance) {
  window.BuymaInsider = appInstance;

  const shippingServicesPayload = PreloadStore.get('shipping_services');
  appInstance
    .lookup('service:store')
    .pushPayload('shippingService', shippingServicesPayload);
}

export default {
  name:  '00-bootstrap',
  after: 'ember-data',
         initialize
};
