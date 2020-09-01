const DataLoader = require('dataloader');

function createLoaders(datasources) {
  const { batchProducts } = datasources.mongodb.dataloaders;
  return {
    getProductsDataLoader: new DataLoader(batchProducts, { cacheKeyFn: key => key.toString() }),
  };
}

module.exports = {
  createLoaders,
};
