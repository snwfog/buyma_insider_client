import DS from 'ember-data';
import ApplicationSerializer from '../application';
import UserArticleSold from '../../models/user/article-sold';

const attrs = {
  buyer:     { embedded: 'always' },
  price:     { serialize: false },
  createdAt: { serialize: false },
  updatedAt: { serialize: false },
};

Object.keys(UserArticleSold.STATUS)
  .reduce((memoAttrs, key) => {
    memoAttrs[ `${key}At` ] = { serialize: false };
    return memoAttrs;
  }, attrs);

const UserArticleSoldSerializer = ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, { attrs });
export default UserArticleSoldSerializer;

