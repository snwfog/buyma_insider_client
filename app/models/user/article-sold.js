import Ember from "ember";
import DS from "ember-data";

const { computed }                 = Ember;
const { hasMany, belongsTo, attr } = DS;

const STATUS = {
  confirmed: 0,
  shipped:   1,
  received:  2,
  cancelled: 3,
  returned:  4
};

const statusAttrs = Object
  .keys(STATUS)
  .reduce((memoStatus, status) => {
    if (delete memoStatus[ status ]) {
      memoStatus[ `${status}At` ] = attr('datetime');
    }
    return memoStatus;
  }, Ember.copy(STATUS));

const UserArticleSold = DS.Model.extend(statusAttrs, {
  user:             belongsTo('user',           { inverse: 'articleSolds' }),
  article:          belongsTo('article'),
  exchangeRate:     belongsTo('exchange-rate',  { async: false }),
  buyer:            belongsTo('buyer',          { async: false }),
  shippingServices: hasMany('shipping-service', { async: false }),
  extraTariffs:     hasMany('extra-tariff',     { async: false }),
  status:           attr(),
  price:            attr('money', { code: 'cad' }),
  notes:            attr(),
  soldPrice:        attr('money', { code: 'jpy' }),
  createdAt:        attr('datetime'),
  updatedAt:        attr('datetime'),

  createdAtDay: computed('createdAt', function () {
    return this.get('createdAt').format('DDDD');
  }),
});

UserArticleSold.reopenClass({
  STATUS
});

export default UserArticleSold;
