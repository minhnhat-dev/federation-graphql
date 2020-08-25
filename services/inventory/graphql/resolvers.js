const mongoose = require('mongoose');
const { UserInputError } = require('apollo-server');
const { InventoryService } = require('../services');
const { InventoryModel } = require('../models');
const { inventoriesDataLoader } = require('../data-loaders');

const resolvers = {
  Product: {
    __resolveReference(object) {
      const { getInventory } = inventoriesDataLoader;
      const inventory = getInventory.load(object.upc);

      return {
        ...object,
        ...inventory,
      };
    },
    shippingEstimate(object) {
      // free for expensive items
      if (object.price > 1000) return 0;
      // estimate is based on weight
      return object.weight * 0.5;
    },
  },
  Mutation: {
    createInventory: async (_, args) => {
      const { upc, inStock } = args;
      // validate upc
      const ProductModel = mongoose.connection.db.collection('products');
      const promise = [];
      promise[0] = ProductModel.countDocuments({ upc });
      promise[1] = InventoryModel.countDocuments({ upc });
      const [productCount, inventoryCount] = await Promise.all(promise);

      if (!productCount) {
        throw new UserInputError('Upc invalid!');
      }

      if (inventoryCount) {
        throw new UserInputError(`Inventory for upc: ${upc} already exists!`);
      }

      return InventoryService.create({ upc, inStock });
    },
  },
};

module.exports = resolvers;
