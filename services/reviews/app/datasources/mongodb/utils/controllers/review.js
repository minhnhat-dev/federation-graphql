const { Reviews } = require('../../models');

const findOneReview = async (query = {}, options = {}) => {
  const { select } = options;
  return Reviews.findOne(query).lean();
};

const findReviews = async (filter = {}, options = {}) => {
  const { skip, limit, select } = options;
  return Reviews.find(filter).select(select).skip(skip).limit(limit)
    .lean();
};

module.exports = {
  findOneReview,
  findReviews,
};
