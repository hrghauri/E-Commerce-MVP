const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = require('./options');

const itemSchema = new Schema(
  {
    title: String,
    price: Number,
    inventory: Number,
    description: String,
    imageUrl: String
  },
  options
);

const Item = mongoose.model('item', itemSchema);

module.exports = Item;
