const DataLoader = require('dataloader');

function createLoaders(datasources) {
  const { batchNumberReviews, batchProductReviews, batchUserReviews } = datasources.mongodb.dataloaders;
  return {
    getUserReviewsDataLoader: new DataLoader(batchUserReviews, { cacheKeyFn: key => key.toString() }),
    getProductReviewsDataLoader: new DataLoader(batchProductReviews, { cacheKeyFn: key => key.toString() }),
    getNumberOfReviewsDataLoader: new DataLoader(batchNumberReviews, { cacheKeyFn: key => key.toString() }),
  };
}

module.exports = {
  createLoaders,
};
