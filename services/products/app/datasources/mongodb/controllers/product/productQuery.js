const { ProductsModel } = require('../../models');

const count = async (query) => ProductsModel.countDocuments(query);

const findOne = async (query = {}, options = {}) => {
  const { select } = options;
  return ProductsModel.findOne(query).lean(select).exec();
};

const find = async (filter = {}, options = {}) => {
  const { skip, limit, select } = options;
  return ProductsModel.find(filter).skip(skip).limit(limit).lean()
    .exec();
};

module.exports = {
  count,
  find,
  findOne,
};
