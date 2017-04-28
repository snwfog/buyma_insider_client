import ApplicationSerializer from "../application";

export default ApplicationSerializer.extend({
  attrs: {
    exchangeRate: { serialize: false },
    createdAt:    { serialize: false },
    updatedAt:    { serialize: false },
  },
});
