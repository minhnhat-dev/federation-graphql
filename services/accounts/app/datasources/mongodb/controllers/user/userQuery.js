const { Users } = require('../../models');
const {} = require('');

async function getUsers({ input = {} }, { datasources }, info) {
  let query = {};
  const { mongodb, redis } = datasources;
  const { skip, limit, q } = input;
  if (q) {
    const querySearch = mongodb.utils.buildTextSearch(['email'], q);
    query = { ...querySearch, ...query };
  }
  const fieldsSelect = mongodb.utils.getMongooseSelectionFromRequest2(info);
  const select = Object.keys(fieldsSelect.data).join(' ');
  const usersCached = await redis.get(q);
  if (usersCached) {
    return JSON.parse(usersCached);
  }
  const promises = [
    Users.countDocuments(query),
    Users.find(query).select(select).skip(skip).limit(limit)
      .lean()
      .exec(),
  ];
  const [total, users] = await Promise.all(promises);
  const response = {
    total,
    data: users,
  };
  const usersExpiry = process.env.REDIS_USERS_EXPIRY || 10;
  redis.set(q, JSON.stringify(response), 'EX', usersExpiry);
  return response;
}

async function getMe({ input = {} }, { datasources }, info) {
  const { id } = input;
  const { mongodb } = datasources;
  const fieldsSelect = mongodb.utils.getMongooseSelectionFromRequest2(info);
  const select = Object.keys(fieldsSelect.data).join(' ');
  const user = await Users.findOne({ _id: id }).select(select).lean();
  return {
    data: user,
  };
}


module.exports = {
  getUsers,
  getMe,
};
