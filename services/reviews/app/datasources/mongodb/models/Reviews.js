const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ReviewSchema = new Schema(
  {
    body: String,
    authorID: {
      type: ObjectId,
      ref: 'users',
      required: true,
    },
    product: {
      upc: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model(
  'Review',
  ReviewSchema,
  'reviews',
);
