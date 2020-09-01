const mongoose = require('mongoose');

const { Schema } = mongoose;

const Status = Object.freeze({
  inactive: 'inactive',
  active: 'active',
  deleted: 'deleted',
});

const UserSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    active: { type: String, default: 'active' },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

Object.assign(UserSchema.statics, { Status });

module.exports = mongoose.model(
  'User',
  UserSchema,
  'users',
);
