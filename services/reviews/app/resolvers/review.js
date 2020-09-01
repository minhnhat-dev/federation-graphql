function author(review) {
  return { __typename: 'User', _id: review.authorID };
}

function product(review) {
  return { __typename: 'Product', upc: review.product.upc };
}

module.exports = {
  author,
  product,
};
