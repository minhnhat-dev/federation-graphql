const DataLoader = require('dataloader');

function createLoaders(datasources) {
  const { batchUsers } = datasources.mongodb.dataloaders;
  return {
    getUserDataLoader: new DataLoader(batchUsers, { cacheKeyFn: key => key.toString() }),
  };
}

module.exports = {
  createLoaders,
};
