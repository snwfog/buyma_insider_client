import PreloadStore from "../preload-store";

export function initialize(appInstance) {
  window.BuymaInsider = appInstance;

  const store                   = appInstance.lookup('service:store');

  // Shipping services
  const shippingServicesPayload = PreloadStore.get('shipping_services');
  store.pushPayload('shippingService', shippingServicesPayload);

  // Article notification criteria
  const articleNotificationCriteriaPayload = PreloadStore.get('article_notification_criteria');
  store.pushPayload('article/notificationCriterium', articleNotificationCriteriaPayload);
}

export default {
  name:  '00-bootstrap',
  after: 'ember-data',
         initialize
};
