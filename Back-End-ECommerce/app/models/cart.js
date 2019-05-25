const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = require('./options');

const cartSchema = new Schema(
  {
    itemsQuantities: [
      {
        _id: false,
        item: { type: Schema.ObjectId, ref: 'Item' },
        quantity: Number
      }
    ],
    status: String
  },
  options
);

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
