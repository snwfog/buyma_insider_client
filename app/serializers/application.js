import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  modelNameFromPayloadKey(payloadKey) {
    let dict = {
      'merchant-metadata':                              'merchant/metadatum',
      'crawl-sessions':                                 'merchant/crawl-session',
      'index-pages':                                    'merchant/index-page',
      'price-histories':                                'article/price-history',
      'article-notification-criteria':                  'article/notification-criterium',
      'discount-percent-article-notification-criteria': 'article/notification-criterium/discount-percent',
      'user-auth-tokens':                               'user/auth-token',
      'user-article-watcheds':                          'user/article-watched',
      'user-article-solds':                             'user/article-sold',
      'user-article-notifieds':                         'user/article-notified',
      'user-article-sold-shipping-services':            'user/article-sold-shipping-service',
    };

    let modelKey = dict[ payloadKey ];
    return !!modelKey ? modelKey : this._super(payloadKey);
  },

  payloadKeyFromModelName(key) {
    let pluralizeKey = this._super(...arguments);
    // TODO: This do for now, but probably should be more sophisticated
    // info(`payloadKeyFromModelName ${key}`);
    return pluralizeKey.split('/').join('_');
  },
});
