const { InventoryModel } = require('../models');

const count = async (query) => InventoryModel.countDocuments(query);

const create = async (inventory) => InventoryModel.create(inventory);

const update = (id, data) => InventoryModel.updateOne({ _id: id }, { $set: data });

const findOne = async (query = {}, options = {}) => {
  const { select } = options;
  return InventoryModel.findOne(query).lean().exec();
};

const find = async (filter = {}, options = {}) => {
  const { skip, limit, select } = options;
  return InventoryModel.find(filter).skip(skip).limit(limit).lean()
    .exec();
};

module.exports = {
  count,
  find,
  create,
  update,
  findOne,
};
