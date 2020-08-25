const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const database = require('./datasources/mongodb/models/db');
const typeDefs = require('./graphql');
const resolvers = require('./resolvers');

database.connectDb();

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

module.exports = server;
