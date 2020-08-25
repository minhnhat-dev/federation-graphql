const { gql } = require('apollo-server');

const typeDefs = gql`

  type Inventory {
    upc: String
    inStock: Boolean
  }

  extend type Product @key(fields: "upc") {
    upc: String! @external
    weight: Int @external
    price: Int @external
    inStock: Boolean
    shippingEstimate: Int @requires(fields: "price weight")
  }

  extend type Mutation {
    createInventory(upc: String!, inStock: Boolean!): Inventory
  }
`;

module.exports = typeDefs;
