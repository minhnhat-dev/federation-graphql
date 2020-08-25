const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const InventorySchema = require('./graphql');
const database = require('./models/db');

database.connectDb();
const server = new ApolloServer({
  schema: buildFederatedSchema([
    InventorySchema
  ])
});

server.listen({ port: 4004 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const inventory = [
  { upc: "1", inStock: true },
  { upc: "2", inStock: false },
  { upc: "3", inStock: true }
];
