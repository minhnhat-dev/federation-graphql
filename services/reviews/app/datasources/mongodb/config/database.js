require('dotenv').config();

const mongoUri = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
console.log('mongoUri', mongoUri);
module.exports = {
  mongoUri,
};
