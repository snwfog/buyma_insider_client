import DS from "ember-data";
import PreloadStore from "../preload-store";
import SingletonMixin from "../mixins/singleton";

const { hasMany, belongsTo, attr } = DS;

const User = DS.Model.extend({
  username:  attr(),
  createdAt: attr('datetime'),
  updatedAt: attr('datetime')
});

User.reopenClass(SingletonMixin,
  {
    createCurrent() {
      const userJson = PreloadStore.get('current_user') || {};
      if (userJson) {
        const store = BuymaInsider.lookup('service:store');
        return store.createRecord('user', userJson);
      }

      return null;
    }
  });

export default User;
