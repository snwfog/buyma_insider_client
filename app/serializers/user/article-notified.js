import ApplicationSerializer from '../application';

export default ApplicationSerializer.extend({
  attrs: {
    notificationCriteria: { serialize: false },
    createdAt:            { serialize: false },
    updatedAt:            { serialize: false },
  },

  keyForRelationship(key, relationship, method) {
    if (key === 'notificationCriteria') {
      key = 'articleNotificationCriteria';
    }

    return this._super(key, relationship, method);
  },

  payloadKeyFromModelName(modelName) {
    if (modelName === 'article/notification-criterium/discount-percent') {
      modelName = 'article-notification-criterium';
    }
    return this._super(modelName);
  }
});