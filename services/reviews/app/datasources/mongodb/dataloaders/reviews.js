/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { Reviews } = require('../models');

const { ObjectId } = mongoose.Types;
/**
 * batch function data loader get reviews by user ids
 * @ids {array} the arrays ids of users:
 */
async function batchUserReviews(ids) {
  const idsObject = ids.map(id => ObjectId(id));
  const reviews = await Reviews.find({ authorID: { $in: idsObject } });
  return ids.map(id => reviews.filter(item => item.authorID.equals(id)));
}

/**
 * batch function data loader get info user by id
 * @ids {array} the arrays ids of users:
 */
async function batchProductReviews(upcs) {
  const reviews = await Reviews.find({ 'product.upc': { $in: upcs } });
  return upcs.map(upc => reviews.filter(item => item.product.upc === upc));
}

/**
 * batch function data loader get info user by id
 * @ids {array} the arrays ids of users:
 */
// async function batchUsers(ids) {
//   const idsObject = ids.map(id => new mongoose.Types.ObjectId(id));
//   const users = await UsersModel.find({ _id: { $in: idsObject } }).toArray();
//   return users.map(id => users.find(item => item._id.equals(id)));
// }

/**
 * batch function data loader get number of review of user
 * @ids {array} the arrays ids of users:
 */
async function batchNumberReviews(ids) {
  const idsObject = ids.map(id => ObjectId(id));
  const reviews = await Reviews.find({ authorID: { $in: idsObject } });
  return ids.map(id => reviews.filter(item => item.authorID.equals(id)).length || 0);
}

module.exports = {
  batchUserReviews,
  batchProductReviews,
  batchNumberReviews,
};
