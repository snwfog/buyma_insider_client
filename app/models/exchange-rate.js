import DS from "ember-data";
import moment from "moment";

const { computed } = Ember;
const { attr }     = DS;
const ExchangeRate = DS.Model.extend({
  base:      attr(),
  timestamp: attr('datetime'),
  rates:     attr('hash'),

  'expired?': computed.alias('isExpired'),
  isExpired:  computed('timestamp', function () {
    return moment().locale()
      .substract(ExchangeRate.EXPIRES_IN, 'seconds')
      .isAfter(this.get('timestamp'));
  }),
});

ExchangeRate.reopenClass({
  EXPIRES_IN: 3600, // expires in 1 hour as seconds
});

export default ExchangeRate;
