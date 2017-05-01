import ApplicationSerializer from "../application";
import UserSoldArticle from "../../models/user/sold-article";

const attrs = {
  createdAt:    { serialize: false },
  updatedAt:    { serialize: false },
};

Object.keys(UserSoldArticle.STATUS)
  .reduce((memoAttrs, key) => {
    memoAttrs[ `${key}At` ] = { serialize: false };
    return memoAttrs;
  }, attrs);

const UserSoldArticleSerializer = ApplicationSerializer
  .extend({
    attrs
  });

export default UserSoldArticleSerializer;

