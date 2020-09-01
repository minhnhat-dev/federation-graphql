async function reviews({ _id }, args, { dataLoaders }) {
  return dataLoaders.getUserReviewsDataLoader.load(_id);
}

async function numberOfReviews({ _id }, args, { dataLoaders }) {
  return dataLoaders.getNumberOfReviewsDataLoader.load(_id);
}

module.exports = {
  reviews,
  numberOfReviews,
};
