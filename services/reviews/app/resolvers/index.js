const Query = require('./query');
const Mutation = require('./mutation');
const Product = require('./product');
const User = require('./user');
const Review = require('./review');

const resolvers = {
  Query,
  Mutation,
  Product,
  User,
  Review,
};

module.exports = resolvers;
