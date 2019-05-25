const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = require('./options');

const orderSchema = new Schema(
  {
    cart: { type: Schema.ObjectId, ref: 'Cart' },
    clientTime: String,
    serverTime: String,
    customerEmail: String
  },
  options
);

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
