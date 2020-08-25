const { UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const { ReviewService } = require('../services');
const { reviewsDataLoader } = require('../data-loaders');
const { ReviewModel } = require('../models');

const resolvers = {
  Query: {
    test: async () => {
      // const reviews = await ReviewModel.aggregate([{
      //   $lookup: {
      //     from: 'users',
      //     localField: 'authorID',
      //     foreignField: '_id',
      //     as: 'user',
      //   },
      // }]);
      const UserModel = mongoose.connection.db.collection('users');
      // const reviews = await ReviewModel.find().populate({ path: 'users', model: UserModel });
      console.log('reviews', reviews); // { path: 'created_by', model: User },
      return reviews;
    },
  },
  Review: {
    author(review) {
      return { __typename: 'User', _id: review.authorID };
    },
    product(review) {
      return { __typename: 'Product', upc: review.product.upc };
    },
  },
  User: {
    reviews: ({ _id }) => {
      const { getUserReviews } = reviewsDataLoader;
      return getUserReviews.load(_id);
    },
    // email: async ({ _id }) => {
    //   const objectId = new mongoose.Types.ObjectId(_id);
    //   const UserModel = mongoose.connection.db.collection('users');
    //   const users = await UserModel.find({ _id: objectId }).toArray();
    //   const email = users[0] ? users[0].email : '';
    //   return email;
    // },
    numberOfReviews: async ({ _id }) => {
      // can apply data loader
      const { getNumberOfReviews } = reviewsDataLoader;
      return getNumberOfReviews.load(_id);
      // const objectAuthorId = new mongoose.Types.ObjectId(_id);
      // return ReviewService.count({ authorID: objectAuthorId });
    },
  },
  Product: {
    reviews: ({ upc }) => {
      const { getProductReviews } = reviewsDataLoader;
      return getProductReviews.load(upc);
    },
    // name: async ({ upc }) => {
    //   const ProductModel = mongoose.connection.db.collection('products');
    //   const products = await ProductModel.find({ upc }).toArray();
    //   const name = products[0] ? products[0].name : '';
    //   return name;
    // },
    displayName: (product) => `${product.name} - ${product.upc}`,
  },
  Mutation: {
    createReview: async (_, args) => {
      const { authorID, body, upc } = args;
      const UserModel = mongoose.connection.db.collection('users');
      const ProductModel = mongoose.connection.db.collection('products');
      const promise = [];
      const authObjectId = new mongoose.Types.ObjectId(authorID);
      promise[0] = UserModel.countDocuments({ _id: authObjectId });
      promise[1] = ProductModel.countDocuments({ upc });
      const [userCount, productCount] = await Promise.all(promise);
      if (!userCount) {
        throw new UserInputError('authorID invalid');
      }

      if (!productCount) {
        throw new UserInputError('upc invalid');
      }
      const review = {
        authorID: authObjectId,
        body,
        product: { upc },
      };
      return ReviewService.create(review);
    },
  },
};

module.exports = resolvers;
