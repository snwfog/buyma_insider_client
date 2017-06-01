import DS from 'ember-data';

const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  indexPage: belongsTo('merchant/index-page', { async: true }),
});
