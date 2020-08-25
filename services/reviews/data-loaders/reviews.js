/* eslint-disable no-underscore-dangle */
const DataLoader = require('dataloader');
const mongoose = require('mongoose');
const { ReviewService } = require('../services');

/**
 * batch function data loader get reviews by user ids
 * @ids {array} the arrays ids of users:
 */
async function batchUserReviews(ids) {
  const idsObject = ids.map((id) => mongoose.Types.ObjectId(id));
  const reviews = await ReviewService.find({ authorID: { $in: idsObject } });
  // eslint-disable-next-line eqeqeq
  return ids.map((id) => reviews.filter((item) => item.authorID.toString() == id.toString()));
}

/**
 * batch function data loader get info user by id
 * @ids {array} the arrays ids of users:
 */
async function batchProductReviews(upcs) {
  const reviews = await ReviewService.find({ 'product.upc': { $in: upcs } });
  // eslint-disable-next-line eqeqeq
  return upcs.map((upc) => reviews.filter((item) => item.product.upc === upc));
}

/**
 * batch function data loader get info user by id
 * @ids {array} the arrays ids of users:
 */
async function batchUsers(ids) {
  const UserModel = mongoose.connection.db.collection('users');
  const idsObject = ids.map((id) => new mongoose.Types.ObjectId(id));
  const users = await UserModel.find({ _id: { $in: idsObject } }).toArray();
  // eslint-disable-next-line eqeqeq
  return users.map((id) => users.find((item) => item._id.toString() === id.toString()));
}

/**
 * batch function data loader get number of review of user
 * @ids {array} the arrays ids of users:
 */
async function batchNumberReviews(ids) {
  const idsObject = ids.map((id) => new mongoose.Types.ObjectId(id));
  const reviews = await ReviewService.find({ authorID: { $in: idsObject } });
  // eslint-disable-next-line eqeqeq
  return ids.map((id) => reviews.filter((item) => item.authorID.toString() === id.toString()).length || 0);
}

module.exports = {
  getUserReviews: new DataLoader(batchUserReviews, { cacheKeyFn: (key) => key.toString() }),
  getProductReviews: new DataLoader(batchProductReviews, { cacheKeyFn: (key) => key.toString() }),
  getUser: new DataLoader(batchUsers, { cacheKeyFn: (key) => key.toString() }),
  getNumberOfReviews: new DataLoader(batchNumberReviews, { cacheKeyFn: (key) => key.toString() }),
};
