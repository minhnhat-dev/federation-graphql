const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { buildFederatedSchema } = require('@apollo/federation');
const datasources = require('./datasources');
const typeDefs = require('./graphql');
const resolvers = require('./resolvers');
const { createLoaders } = require('./loaders');
// Express App
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

// parse application/json
app.use(bodyParser.json());

// Use default logger for now
// app.use(logger('dev'));
app.use(cors());
// app.use(auth.verifyToken);

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
  context: async ({ req }) => {
    const user = await datasources.mongodb.utils.getUser(req);
    return {
      ...req,
      user,
      dataLoaders: createLoaders(datasources),
      datasources,
    };
  },
  tracing: true,
  formatError: err => new Error(err.message.toString()),
});

server.applyMiddleware({
  app,
  // change this if you want to host schema on a different path
  path: '/',
});

// This is to check if the service is online or not
app.use('/ping', (req, res) => {
  res.json({ reply: 'pong' });
  res.end();
});

module.exports = app;
