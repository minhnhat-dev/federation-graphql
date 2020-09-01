async function __resolveReference({ _id }, { dataLoaders }) {
  return dataLoaders.getUserDataLoader.load(_id);
}

module.exports = {
  __resolveReference,
};
