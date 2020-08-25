const database = require('./database');
const network = require('./network');
const token = require('./token');

module.exports = {
  ...database,
  ...network,
  ...token,
};
