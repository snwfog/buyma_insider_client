import DS from 'ember-data';

const { belongsTo, attr } = DS;
export default DS.Model.extend({
//  articleSold:  hasMany('user/article-sold'),
  firstName:    attr(),
  lastName:     attr(),
  emailAddress: attr(),
});
