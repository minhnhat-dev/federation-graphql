const { ProductController } = require('../datasources/mongodb/controllers');
const { productsDataLoader } = require('../datasources/mongodb/dataloaders');

const resolvers = {
  Product: {
    __resolveReference(object) {
      const { upc } = object;
      const { getProducts } = productsDataLoader;
      return getProducts.load(upc);
    },
  },
  Query: {
    product: async (_, args) => {
      const { id } = args;
      return ProductController.query.findOne({ _id: id });
    },
    products: async (_, args) => ProductController.query.find({}),
  },
  Mutation: {
    createProduct: async (_, args) => {
      const { input } = args;
      console.log('input', input);
      return ProductController.command.create(input);
    },
  },
};

module.exports = resolvers;
