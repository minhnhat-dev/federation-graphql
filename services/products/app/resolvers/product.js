function __resolveReference({ upc }, { dataLoaders }) {
  return dataLoaders.getProductsDataLoader.load(upc);
}

module.exports = {
  __resolveReference,
};
