require('dotenv').config();

let MONGO_URL;
if (process.env.NODE_ENV === 'test') {
  MONGO_URL = process.env.MONGO_URI_TEST;
} else {
  MONGO_URL = process.env.MONGO_URI;
}
const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: MONGO_URL,

    // TODO Change this to your database name:
    // databaseName: 'YOURDATABASENAME',

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: '.js',
};

// Return the config as a promise
module.exports = config;
