const faker = require('faker');
const database = require('../models/db');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    const users = [
      {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
      {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
      {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    ];

    const products = [
      {
        name: faker.commerce.productName(),
        upc: faker.random.uuid(),
        price: faker.commerce.price(),
        weight: faker.random.number(),
      },
      {
        name: faker.commerce.productName(),
        upc: faker.random.uuid(),
        price: faker.commerce.price(),
        weight: faker.random.number(),
      },
      {
        name: faker.commerce.productName(),
        upc: faker.random.uuid(),
        price: faker.commerce.price(),
        weight: faker.random.number(),
      },
    ];
    const promise = [];
    promise[0] = db.collection('users').insertMany(users);
    promise[1] = db.collection('products').insertMany(products);
    const [{ insertedIds: insertedUserIds }, { ops: productsCreated }] = await Promise.all(promise);
    const userIds = Object.values(insertedUserIds);
    const upcs = productsCreated.map((product) => product.upc);
    const reviews = [];

    userIds.forEach((userId) => {
      const review = {
        authorID: userId,
        product: {
          upc: upcs[Math.floor(Math.random() * upcs.length)],
        },
        body: faker.random.words(),
      };
      reviews.push(review);
    });

    await db.collection('reviews').insertMany(reviews);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.dropDatabase();
  },
};
