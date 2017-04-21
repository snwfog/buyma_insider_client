import DS from "ember-data";
import PreloadStore from "../preload-store";
import SingletonMixin from "../mixins/singleton";

const { hasMany, belongsTo, attr } = DS;

const User = DS.Model.extend({
  watchedArticles: hasMany('user/watchedArticle'),

  username:  attr(),
  createdAt: attr('datetime'),
  updatedAt: attr('datetime')
});

User.reopenClass(SingletonMixin,
  {
    createCurrent() {
      const currentUserJson = PreloadStore.get('current_user');
      if (currentUserJson) {
        const store = BuymaInsider.lookup('service:store');
        store.pushPayload('user', currentUserJson);
        return store.peekRecord('user', currentUserJson.data.id);
      }

      return null;
    }
  });

export default User;
