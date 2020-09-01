async function createReview(_, { input = {} }, context) {
  const { mongodb } = context.datasources;
  return mongodb.createReview(context, input);
}

module.exports = {
  createReview,
};
