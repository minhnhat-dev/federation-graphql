const ReviewController = require('./review');
const UserController = require('./user');
const ProductController = require('./product');

module.exports = {
  ...ReviewController,
  ...UserController,
  ...ProductController,
};
