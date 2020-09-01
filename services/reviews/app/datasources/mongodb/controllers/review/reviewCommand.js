const { UserInputError } = require('apollo-server-express');
const { Users, Products, Reviews } = require('../../models');

async function createReview(context, { input }) {
  const { authorID, body, upc } = input;
  const promise = [
    Users.countDocuments({ _id: authorID }),
    Products.countDocuments({ upc }),
  ];

  const [userCount, productCount] = await Promise.all(promise);
  if (!userCount) {
    throw new UserInputError('authorID invalid');
  }

  if (!productCount) {
    throw new UserInputError('upc invalid');
  }

  const review = {
    authorID,
    body,
    product: { upc },
  };
  const reviewSaved = await Reviews.create(review);
  return {
    data: reviewSaved,
  };
}

module.exports = {
  createReview,
};
