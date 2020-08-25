/* eslint-disable no-underscore-dangle */
const { UserController } = require('../datasources/mongodb/controllers');
const { usersDataLoader } = require('../datasources/mongodb/dataloaders');

const resolvers = {
  Query: {
    me: async (_, args) => {
      const { id } = args;
      const { getUser } = usersDataLoader;
      return getUser.load(id);
    },
  },
  User: {
    async __resolveReference(object) {
      const { _id } = object;
      const { getUser } = usersDataLoader;
      return getUser.load(_id);
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      console.log('111');
      const { email, password } = args;
      const user = await UserController.command.create({ email, password });
      console.log('user', user);
      return user;
    },
  },
};

module.exports = resolvers;
