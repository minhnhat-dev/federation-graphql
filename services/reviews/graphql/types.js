const { gql } = require('apollo-server');

const typeDefs = gql`
  type Review @key(fields: "_id") {
    _id: ID!
    body: String
    author: User
    product: Product
  }

  extend type User @key(fields: "_id") {
    _id: ID! @external
    reviews: [Review]
    numberOfReviews: Int
  }

  extend type Product @key(fields: "upc") {
    upc: String! @external
    name: String @external
    displayName: String @requires(fields: "upc name")
    reviews: [Review]
  }

  extend type Query {
    test: [Review]
  }

  extend type Mutation {
    createReview(authorID: ID!, body: String!, upc: String!): Review
  }
`;

module.exports = typeDefs;
