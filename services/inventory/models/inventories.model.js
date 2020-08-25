const mongoose = require('mongoose');
const { Schema } = mongoose;

const InventorySchema = new Schema(
  {
    upc: {
      type: String,
      required: true,
      unique: true,
    },
    inStock: Boolean,
  },
  {
    versionKey: false,
    timestamps: true
  },
);

module.exports = mongoose.model(
  'Inventory',
  InventorySchema,
  'inventories',
);
