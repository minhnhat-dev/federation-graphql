const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: 1,
    },
    upc: {
      type: String,
      required: true,
      unique: true,
    },
    price: Number,
    weight: Number,
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model(
  'Product',
  ProductSchema,
  'products',
);
