// const path = require('path');
// const { mergeResolvers } = require('@graphql-tools/merge');
// const { loadFilesSync } = require('@graphql-tools/load-files');

// const resolversArray = loadFilesSync(path.join(__dirname, './'), { extensions: ['js'] });

// module.exports = mergeResolvers(resolversArray);
const Query = require('./query');
const Mutation = require('./mutation');
const User = require('./user');

const resolvers = {
  Query,
  Mutation,
  User,
};

module.exports = resolvers;
