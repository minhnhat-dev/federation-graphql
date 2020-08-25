require('dotenv').config();

let MONGO_URI;
if (process.env.NODE_ENV === 'test') {
  MONGO_URI = process.env.MONGO_URI_TEST;
} else {
  MONGO_URI = process.env.MONGO_URI;
}
module.exports = {
  PORT: process.env.PORT,
  IP: process.env.IP,
  MONGO_URI,
  SERVICE_NAME: process.env.SERVICE_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
};
