import Ember from "ember";
import DS from "ember-data";

const { computed }                 = Ember;
const { hasMany, belongsTo, attr } = DS;

const STATUS = [ 'confirmed', 'shipped', 'received', 'cancelled', 'returned' ];

const UserSoldArticle = DS.Model.extend({
  user:         belongsTo('user'),
  article:      belongsTo('article'),
  exchangeRate: belongsTo('exchange-rate'),

  status:       attr(),
  soldPrice:    attr('money', { code: 'cad' }),
  createdAt:    attr('datetime'),
  updatedAt:    attr('datetime'),

  createdAtDay: computed('createdAt', function () {
    return this.get('createdAt').format('DDDD');
  }),
});

UserSoldArticle.reopenClass({
  STATUS
});

export default UserSoldArticle;
