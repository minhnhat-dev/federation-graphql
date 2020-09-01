const { Products } = require('../../models');

async function getProduct({ input = {} }, { datasources }, info) {
  const { id } = input;
  const { mongodb } = datasources;
  const fieldsSelect = mongodb.utils.getMongooseSelectionFromRequest2(info);
  const select = Object.keys(fieldsSelect.data).join(' ');
  const product = await Products.findOne({ _id: id }).select(select);
  return {
    data: product,
  };
}

async function getProducts({ input = {} }, { datasources }, info) {
  let query = {};
  const { mongodb } = datasources;
  const { skip, limit, q } = input;
  if (q) {
    const querySearch = mongodb.utils.buildTextSearch(['name', 'upc'], q);
    query = { ...querySearch, ...query };
  }
  const fieldsSelect = mongodb.utils.getMongooseSelectionFromRequest2(info);
  const select = Object.keys(fieldsSelect.data).join(' ');
  const promises = [
    Products.countDocuments(query),
    Products.find(query).select(select).skip(skip).limit(limit)
      .lean()
      .exec(),
  ];
  const [total, products] = await Promise.all(promises);
  return {
    total,
    data: products,
  };
}

module.exports = {
  getProduct,
  getProducts,
};
