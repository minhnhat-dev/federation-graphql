/* eslint-disable no-unused-expressions */
const dbSetup = require('../db-setup');
const api = require('../helpers');
// init setup test
dbSetup.initSetupTest('users');

describe('test for feature of users ', () => {
  describe('createUser(email: String!, password: String!): User', () => {
    it('return info user when create success', async (done) => {
      const user = {
        email: 'emailtest@gmail.com',
        password: 'password',
      };

      const result = await api.createUser(user);
      const data = result.data.data.createUser || {};
      expect(data).toMatchObject({
        _id: expect.any(String),
        email: expect.any(String),
      });
      return done();
    });

    it('return error when create user duplicate email', async (done) => {
      const user = {
        email: 'emailtest@gmail.com',
        password: 'password',
      };
      const result = await api.createUser(user);
      const data = result.data || {};
      expect(data).toMatchObject({
        errors: expect.anything(String),
      });
      return done();
    });
  });

  describe('me(id: ID!): User', () => {
    it('return info user when get user by id', async (done) => {
      const user = {
        email: 'emailtest2@gmail.com',
        password: 'password',
      };
      const resultCreate = await api.createUser(user);
      const dataCreate = resultCreate.data.data.createUser || {};
      const { _id } = dataCreate;
      const resultGet = await api.me({ id: _id });
      const dataGet = resultGet.data.data.me || {};
      expect(dataGet).toMatchObject({
        _id: expect.any(String),
        email: expect.any(String),
      });
      return done();
    });
    it('return null user when get user by id wrong', async (done) => {
      const wrongId = '5f4333e8e9393b72aa17c27a';
      const resultGet = await api.me({ id: wrongId });
      const dataGet = resultGet.data.data.me || null;
      expect(dataGet).toBeNull();
      return done();
    });
  });
});
