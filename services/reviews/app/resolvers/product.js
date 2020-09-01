async function reviews({ upc }, args, { dataLoaders }) {
  return dataLoaders.getProductReviewsDataLoader.load(upc);
}

async function displayName(product) {
  return `${product.name} - ${product.upc}`;
}

module.exports = {
  reviews,
  displayName,
};
