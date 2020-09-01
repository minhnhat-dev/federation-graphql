const { UserInputError } = require('apollo-server-express');
const { Users } = require('../../models');

async function createUser({ input = {} }, context) {
  const { email, password } = input;
  const count = await Users.countDocuments({ email });
  if (count) {
    throw new UserInputError('Email already exist');
  }
  const user = await Users.create({ email, password });
  return {
    data: user,
  };
}

module.exports = {
  createUser,
};
