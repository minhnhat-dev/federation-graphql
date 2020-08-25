/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const DataLoader = require('dataloader');
const { UserController } = require('../controllers');
// async function batchPosts (ids) {
//     const posts = await PostService.find({userId: {$in: ids}});
//     return ids.map(id => posts.filter(item => item.userId.toString() == id.toString()) || null);
// }

/**
 * batch function data loader get info user by id
 * @ids {array} the arrays ids of users:
 */
async function batchUsers(ids) {
  const idsObject = ids.map((id) => new mongoose.Types.ObjectId(id));
  const users = await UserController.query.find({ _id: { $in: idsObject } });

  return ids.map((id) => users.find((item) => item._id.equals(id)));
}

module.exports = {
  getUser: new DataLoader(batchUsers, { cacheKeyFn: (key) => key.toString() }),
};
