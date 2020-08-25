/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
const DataLoader = require('dataloader');
const { ProductController } = require('../controllers');

/**
 * batch function data loader get info product by upc
 * @ids {array} the arrays ids of users:
 */
async function batchProducts(upcs) {
  const products = await ProductController.query.find({ upc: { $in: upcs } });
  return upcs.map((upc) => products.find((item) => item.upc === upc));
}

module.exports = {
  getProducts: new DataLoader(batchProducts, { cacheKeyFn: (key) => key.toString() }),
};
