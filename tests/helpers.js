const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.URI || 'http://localhost:4000/graphql';

const createUser = async (variables = {}) => axios.post(API_URL, {
  query: `
            mutation ($email: String!, $password: String!,) {
              createUser(email: $email, password: $password){
                    _id
                    email
                  }
            }
        `,
  variables,
});

const me = async (variables = {}) => axios.post(API_URL, {
  query: `
            query ($id: ID!){
                me (id: $id) {
                    _id
                    email
                  }
            }
        `,
  variables,
});

module.exports = {
  createUser,
  me,
};
