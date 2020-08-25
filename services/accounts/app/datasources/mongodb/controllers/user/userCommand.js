const jwt = require('jsonwebtoken');
const { UsersModel } = require('../../models');
const config = require('../../config');

const sign = (payload) => jwt.sign(payload, config.JWT_SECRET, { expiresIn: 10800 });

const create = async (user) => UsersModel.create(user);

const update = (id, data) => UsersModel.updateOne({ _id: id }, { $set: data });

module.exports = {
  create,
  update,
  sign,
};
