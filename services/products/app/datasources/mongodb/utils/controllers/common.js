const graphqlFields = require('graphql-fields');
const parseFields = require('graphql-parse-fields');
/**
 * goal function: take fields client query convert to string select
 * @info {object} object info in resolver function
 */
function getMongooseSelectionFromRequest(info) {
  const topLevelFields = graphqlFields(info, {}, { processArguments: true });
  const select = Object.keys(topLevelFields).reduce((pre, cur) => `${pre} ${cur}`, '');
  return select;
}

/**
 * goal function: take fields client query convert to string select
 * @info {object} object info in resolver function
 */
function getMongooseSelectionFromRequest2(info) {
  return parseFields(info);
}

/**
 * goal function: built text search by arr fields name
 * @fields {array[String]} array fields name
 * @q {string} param
 */
function buildTextSearch(fields = [], q = '') {
  const query = {
    $or: [],
  };
  if (!fields.length || q === '') {
    return query;
  }
  fields.forEach((field) => {
    query.$or.push(
      {
        [field]: new RegExp(q, 'i'),
      },
    );
  });
  return query;
}

module.exports = {
  buildTextSearch,
  getMongooseSelectionFromRequest,
  getMongooseSelectionFromRequest2,
};
