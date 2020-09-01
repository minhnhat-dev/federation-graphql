async function createUser(_, args, context) {
  const { mongodb } = context.datasources;
  return mongodb.createUser(args, context);
}

module.exports = {
  createUser,
};
