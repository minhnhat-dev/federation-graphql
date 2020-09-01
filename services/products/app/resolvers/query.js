async function getProduct(_, args, context, info) {
  const { mongodb } = context.datasources;
  return mongodb.getProducts(args, context, info);
}

async function getProducts(_, args, context, info) {
  const { mongodb } = context.datasources;
  return mongodb.getProducts(args, context, info);
}

module.exports = {
  getProduct,
  getProducts,
};
