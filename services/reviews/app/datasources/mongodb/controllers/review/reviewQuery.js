const { Reviews } = require('../../models');

async function getReviews({ datasources }, { input }, info) {
  let query = {};
  const { mongodb } = datasources;
  const { skip, limit, q } = input;
  if (q) {
    const querySearch = mongodb.utils.buildTextSearch(['name', 'upc'], q);
    query = { ...querySearch, ...query };
  }
  const fieldsSelect = mongodb.utils.getMongooseSelectionFromRequest2(info);
  const select = `${Object.keys(fieldsSelect.data).join(' ')} authorID`;
  const promises = [
    Reviews.countDocuments(query),
    Reviews.find(query).select(select).skip(skip).limit(limit)
      .lean(),
  ];
  const [total, reviews] = await Promise.all(promises);
  return {
    total,
    data: reviews,
  };
}

async function getReview({ datasources }, { input }, info) {
  const { id } = input;
  const { mongodb } = datasources;
  const fieldsSelect = mongodb.utils.getMongooseSelectionFromRequest2(info);
  const select = `${Object.keys(fieldsSelect.data).join(' ')} authorID`;
  const review = await Reviews.findOne({ _id: id }).select(select);
  return {
    data: review,
  };
}
module.exports = {
  getReview,
  getReviews,
};
