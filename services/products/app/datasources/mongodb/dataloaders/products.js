const { Products } = require('../models');
/**
 * batch function data loader get info product by upc
 * @ids {array} the arrays ids of users:
 */
async function batchProducts(upcs) {
  const products = await Products.find({ upc: { $in: upcs } });
  return upcs.map(upc => products.find(item => item.upc === upc));
}

module.exports = {
  batchProducts,
};
