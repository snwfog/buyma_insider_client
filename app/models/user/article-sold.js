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
  price:            attr('money', { code: 'cad' }), // Market price when it was sold
  priceSold:        attr('money', { code: 'jpy' }), // Price we sold at
  notes:            attr(),
  createdAt:        attr('datetime'),
  updatedAt:        attr('datetime'),

  createdAtDay: computed('createdAt', function () {
    return this.get('createdAt').format('DDDD');
  }),

  statuses: computed('status', function() {
    let statuses = Ember.A();
    let articleSold = this;

    Object
      .keys(STATUS)
      .reverse()
      .reduce((latestIsActive, status) => {
        let statusActivatedAt = articleSold.get(`${status}At`);
        let isActive          = false;
        if (!latestIsActive) {
          isActive ^= !!statusActivatedAt;
          latestIsActive = isActive;
        }

        statuses.unshift({
          status,
          isActive:        isActive,
          hasTransitioned: !!statusActivatedAt,
          updatedAt:       statusActivatedAt,
        });

        return latestIsActive;
      }, false);

    return statuses;
  }),
});

UserArticleSold.reopenClass({
  STATUS
});

export default UserArticleSold;
