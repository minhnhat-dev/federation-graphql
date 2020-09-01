const app = require('./app');
const config = require('./config');

// Here you set the PORT and IP of the server
const port = config.port || 4003;
const ip = config.ip || 'localhost';

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
});

app.listen({ port, ip }, () => console.log(`🚀 Server ready at http://${ip}:${port}`));
