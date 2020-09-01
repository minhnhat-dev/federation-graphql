const query = require('./reviewQuery');
const command = require('./reviewCommand');

module.exports = {
  ...query,
  ...command,
};
