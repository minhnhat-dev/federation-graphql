const controller = require('./controllers');
const dataloaders = require('./dataloaders');
const utils = require('./utils');
const database = require('./models/db');

// connect database
database.connectDb();

module.exports = {
  ...controller,
  dataloaders,
  utils,
};
