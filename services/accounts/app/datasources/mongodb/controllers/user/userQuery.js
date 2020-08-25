const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { UsersModel } = require('../../models');
const config = require('../../config');

const count = async (query) => UsersModel.countDocuments(query);

const findOne = async (query = {}, options = {}) => {
  const { select } = options;
  return UsersModel.findOne(query).lean().exec();
};

const find = async (filter = {}, options = {}) => {
  const { skip, limit, select } = options;
  return UsersModel.find(filter).skip(skip).limit(limit).lean()
    .exec();
};

const getUserByToken = async (token) => {
  if (!token) {
    return {
      user: null,
    };
  }
  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    const { id } = decodedToken;
    const user = await UsersModel.findOne({ _id: id });
    return { user };
  } catch (e) {
    console.log(e);
    throw new AuthenticationError('Unauthorized');
  }
};

module.exports = {
  count,
  find,
  findOne,
  getUserByToken,
};
