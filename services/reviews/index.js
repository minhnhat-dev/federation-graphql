/* eslint-disable linebreak-style */
const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const ReviewSchema = require('./graphql');
const database = require('./models/db');

database.connectDb();
const server = new ApolloServer({
  schema: buildFederatedSchema([
    ReviewSchema,
  ]),
});

server.listen({ port: 4002 }).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
// eslint-disable-next-line linebreak-style
});
