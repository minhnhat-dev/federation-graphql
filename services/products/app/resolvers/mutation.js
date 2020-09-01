async function createProduct(_, args, context) {
  const { mongodb } = context.datasources;
  return mongodb.createProduct(args, context);
}

module.exports = {
  createProduct,
};
