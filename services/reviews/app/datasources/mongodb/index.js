const controllers = require('./controllers');
const dataloaders = require('./dataloaders');
const utils = require('./utils');
const database = require('./models/db');
// TODO: connect database
database.connectDb();

module.exports = {
  ...controllers,
  dataloaders,
  utils,
};
