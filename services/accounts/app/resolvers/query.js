async function getMe(_, args, context, info) {
  const { mongodb } = context.datasources;
  return mongodb.getMe(args, context, info);
}

async function getUsers(_, args, context, info) {
  const { mongodb } = context.datasources;
  return mongodb.getUsers(args, context, info);
}

module.exports = {
  getMe,
  getUsers,
};
