const mongoose = require('mongoose');
const database = require('../models/db');

const initSetupTest = (collection) => {
  beforeAll(async () => {
    await database.connectDb();
  });

  afterAll(async () => {
    await mongoose.connection.collection(collection).drop();
    await mongoose.connection.close();
  });
};

module.exports = {
  initSetupTest,
};
