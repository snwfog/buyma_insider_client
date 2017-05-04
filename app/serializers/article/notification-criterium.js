import ApplicationSerializer from '../application';

export default ApplicationSerializer.extend({
  // According to doc, this should be called, but its not...
  // Maybe due to ember version
//   payloadTypeFromModelName: (modelName) => 'article-notification-criterium',

  // Instead this is called to change the _type of the model
  // Update: nope, this is not called, its called within
  // article-watched-serializer hasMany
//   payloadKeyFromModelName: (modelName) => 'article-notification-criterium',
});
