const { ProductsModel } = require('../../models');

const create = async (product) => ProductsModel.create(product);

const update = async (id, data) => ProductsModel.updateOne({ _id: id }, { $set: data });

module.exports = {
  create,
  update,
};
