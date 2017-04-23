import DS from "ember-data";

export default DS.JSONAPISerializer.extend({
  modelNameFromPayloadKey(payloadKey) {
//    payloadKey = payloadKey.split('_').join('/')
//    this.debug(`modelnameFromPayloadKey ${payloadKey}`);
    // TODO: Change this to hash
    var dict = {
      'merchant-metadata':     'merchant/metadatum',
      'crawl-sessions':        'merchant/crawl-session',
      'index-pages':           'merchant/index-page',
      'price-histories':       'article/price-history',
      'user-session-tokens':   'user/session-token',
      'user-watched-articles': 'user/watched-article',
      'user-sold-articles':    'user/sold-article',
    };

    var modelKey = dict[ payloadKey ];
    return !!modelKey ? modelKey : this._super(payloadKey);
  },

  payloadKeyFromModelName(key) {
    var pluralizeKey = this._super(...arguments);
    // TODO: This do for now, but probably should be more sophisticated
    // info(`payloadKeyFromModelName ${key}`);
    return pluralizeKey.split('/').join('_');
  },
});
