import PreloadStore from '../preload-store';

export function initialize(appInstance) {
  window.BuymaInsider = appInstance;

  const store = appInstance.lookup('service:store');

  // Merchants
  const merchantsPayload = PreloadStore.get('merchants');
  store.pushPayload('merchant', merchantsPayload);

  // Shipping services
  const shippingServicesPayload = PreloadStore.get('shipping_services');
  store.pushPayload('shippingService', shippingServicesPayload);

  // Extra tariffs for shipping
  const extraTariffsPayload = PreloadStore.get('extra_tariffs');
  store.pushPayload('extraTariff', extraTariffsPayload);

  // Article notification criteria
  const articleNotificationCriteriaPayload = PreloadStore.get('article_notification_criteria');
  store.pushPayload('article/notificationCriterium', articleNotificationCriteriaPayload);
}

export default {
  name:  '00-bootstrap',
  after: 'ember-data',
  initialize
};
