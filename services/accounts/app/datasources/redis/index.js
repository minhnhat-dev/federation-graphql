const Redis = require('ioredis');
const winston = require('winston');

const client = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

// REDIS_TOKEN_EXPIRY=86400

client.on('error', (error) => {
  winston.error(error);
  client.quit();
});

client.on('connect', () => winston.info('Redis client connected'));

module.exports = client;
