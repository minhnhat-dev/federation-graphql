require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  ip: process.env.IP,
  serviceName: process.env.SERVICE_NAME,
};
