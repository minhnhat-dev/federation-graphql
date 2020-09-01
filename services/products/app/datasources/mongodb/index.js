const controllers = require('./controllers');
const dataloaders = require('./dataloaders');
const database = require('./models/db');
const utils = require('./utils');

// connect database
database.connectDb();
module.exports = {
  ...controllers,
  utils,
  dataloaders,
};
