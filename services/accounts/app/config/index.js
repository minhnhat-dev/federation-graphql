require('dotenv').config();

const mongoUri = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

module.exports = {
  port: process.env.PORT,
  PORT: process.env.PORT,
  IP: process.env.IP,
  MONGO_URI: mongoUri,
  SERVICE_NAME: process.env.SERVICE_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
};
