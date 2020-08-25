const { ReviewModel } = require('../models');

const count = async (query) => ReviewModel.countDocuments(query);

const create = async (review) => ReviewModel.create(review);

const update = (id, data) => ReviewModel.updateOne({ _id: id }, { $set: data });

const findOne = async (query = {}, options = {}) => {
  const { select } = options;
  return ReviewModel.findOne(query).lean(select).exec();
};

const find = async (filter = {}, options = {}) => {
  const { skip, limit, select } = options;
  return ReviewModel.find(filter);
};

module.exports = {
  count,
  find,
  create,
  update,
  findOne,
};
