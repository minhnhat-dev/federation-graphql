const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
});

app.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
