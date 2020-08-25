const mongoose = require('mongoose');
const config = require('../config');

const URI_MONGO = config.MONGO_URI;

const connectDb = () => {
  mongoose.connect(URI_MONGO, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Connect database success!');
    }
  });
};

/* When connect successfully  */
mongoose.connection.on('connected', () => {
  console.info(`Mongoose default connection open to ${URI_MONGO}`);
});

/* If connect throw error */
mongoose.connection.on('error', (err) => {
  console.info(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.info('Mongoose default connection disconnected');
});

mongoose.set('debug', (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info(
      'Mongoose default connection disconnected through app termination',
    );
    throw new Error(
      'Mongoose default connection disconnected through app termination',
    );
  });
});

const closeDb = () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected');
  });
};

const dropCollectionByName = (name, cb) => {
  if (!name) {
    return null;
  }
  mongoose.connection.collections[name].drop((err) => {
    if (err) {
      cb(err, false);
    } else {
      console.log(`Collection ${name} dropped`);
      cb(null, true);
    }
  });
};

module.exports = {
  connectDb,
  closeDb,
  dropCollectionByName,
};
