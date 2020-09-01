const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { Users } = require('../../models');

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

function comparePassword(pw, hash) {
  return bcrypt.compareSync(pw, hash);
}

function generateToken(
  { _id, email },
  expiresIn = 60 * 60 * 24 * 7,
) {
  return jwt.sign({ _id, email }, process.env.JWT_SECRET, {
    expiresIn,
  });
}

async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

async function getUser(req) {
  let user = null;
  const token = req.headers.authorization || '';

  if (token) {
    user = await verifyToken(token);
    if (!user) throw new AuthenticationError('You must be logged in!');
  }
  return user;
}

const findUsers = async (filter = {}, options = {}) => {
  const { skip, limit, select } = options;
  return Users.find(filter).select(select).skip(skip).limit(limit)
    .lean()
    .exec();
};

module.exports = {
  hashPassword,
  comparePassword,
  verifyToken,
  generateToken,
  findUsers,
  getUser,
};
