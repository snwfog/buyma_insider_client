import ApplicationSerializer from "../application";
import UserArticleSold from "../../models/user/article-sold";

const attrs = {
  createdAt: { serialize: false },
  updatedAt: { serialize: false },
};

Object.keys(UserArticleSold.STATUS)
  .reduce((memoAttrs, key) => {
    memoAttrs[ `${key}At` ] = { serialize: false };
    return memoAttrs;
  }, attrs);

const UserArticleSoldSerializer = ApplicationSerializer
  .extend({
    attrs
  });

export default UserArticleSoldSerializer;

