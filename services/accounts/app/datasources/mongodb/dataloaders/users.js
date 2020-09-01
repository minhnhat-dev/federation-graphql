/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { Users } = require('../models');
const redis = require('../../redis');

const { ObjectId } = mongoose.Types;
/**
 * batch function data loader get info user by id
 * @ids {array} the arrays ids of users:
 */
async function batchUsers(ids) {
  const usersCached = await redis.mget(ids.join(' '));
  if (usersCached[0]) {
    return JSON.parse(usersCached);
  }
  const idsObject = ids.map(id => ObjectId(id));
  const users = await Users.find({ _id: { $in: idsObject } });
  const usersResponse = ids.map(id => users.find(item => item._id.equals(id)));
  await redis.mset(ids.join(' '), JSON.stringify(usersResponse));
  return usersResponse;
}

module.exports = {
  batchUsers,
};
