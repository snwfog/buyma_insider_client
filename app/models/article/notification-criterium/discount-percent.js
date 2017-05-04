import DS from "ember-data";

import ArticleNotificationCriterium from "../notification-criterium";

const { attr, belongsTo } = DS;

export default ArticleNotificationCriterium.extend({
  thresholdPct: attr('number'),
});
