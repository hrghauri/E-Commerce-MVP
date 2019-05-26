const Item = require('../models/item');

const getAllItems = () => {
  return Item.find({}).exec();
};

const getItemById = itemId => {
  return Item.findById(itemId).exec();
};

const getItemByIdForOutsiderWorld = async itemId => {
  const item = await getItemById(itemId);
  return JSON.parse(JSON.stringify(item));
};

const decrementItemInventory = async itemId => {
  const item = await getItemById(itemId);
  item.inventory--;
  return item.save();
};

const incrementItemInventory = async itemId => {
  const item = await getItemById(itemId);
  item.inventory++;
  return item.save();
};

const createItem = (title, price, inventory, description, imageUrl) => {
  const item = new Item({ title, price, inventory, description, imageUrl });
  return item.save();
};

module.exports = {
  getAllItems,
  getItemById,
  decrementItemInventory,
  createItem,
  incrementItemInventory,
  getItemByIdForOutsiderWorld
};
