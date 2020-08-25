/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
const DataLoader = require('dataloader');
const { ProductService } = require('../services');

/**
 * batch function data loader get info product by upc
 * @ids {array} the arrays ids of users:
 */
async function batchProducts(upcs) {
  const products = await ProductService.find({ upc: { $in: upcs } });
  return upcs.map((upc) => products.find((item) => item.upc === upc));
}

module.exports = {
  getProducts: new DataLoader(batchProducts, { cacheKeyFn: (key) => key.toString() }),
};
