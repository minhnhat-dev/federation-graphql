function test() {
  return 'test';
}

async function getReview(_, args, context, info) {
  const { mongodb } = context.datasources;
  return mongodb.getReview(context, args, info);
}

async function getReviews(_, args, context, info) {
  const { mongodb } = context.datasources;
  return mongodb.getReviews(context, args, info);
}

module.exports = {
  test,
  getReview,
  getReviews,
};
