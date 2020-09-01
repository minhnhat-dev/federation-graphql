const { UserInputError } = require('apollo-server-express');
const { Products } = require('../../models');

async function createProduct({ input }, context) {
  const { upc } = input;
  const count = await Products.countDocuments({ upc });
  if (count) {
    throw new UserInputError('Upc already exists');
  }
  const product = await Products.create(input);
  return {
    data: product,
  };
}
module.exports = {
  createProduct,
};
