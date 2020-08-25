/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
const DataLoader = require('dataloader');
const { InventoryService } = require('../services');

/**
 * batch function data loader get info inventory by upc
 * @upcs {array} the arrays upcs of inventories:
 */
async function batchInventory(upcs) {
  const inventories = await InventoryService.find({ upc: { $in: upcs } });
  return upcs.map((upc) => inventories.find((item) => item.upc === upc));
}

module.exports = {
  getInventory: new DataLoader(batchInventory, { cacheKeyFn: (key) => key.toString() }),
};
