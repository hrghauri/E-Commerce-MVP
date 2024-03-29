const Cart = require('../models/cart');
const itemsRepository = require('./items');

const createCart = async itemId => {
  const item = await itemsRepository.getItemById(itemId);
  if (item && item.inventory > 0) {
    let cart = new Cart({ status: 'inProcess', serverTime: Date() });
    cart.itemsQuantities.push({
      item: itemId,
      quantity: 1
    });
    await itemsRepository.decrementItemInventory(itemId);
    await cart.save();

    cart = JSON.parse(JSON.stringify(cart));
    delete cart.status;
    delete cart.serverTime;

    cart.itemsQuantities = cart.itemsQuantities.reduce((acc, itemQuantity) => {
      acc[itemQuantity.item] = itemQuantity.quantity;
      return acc;
    }, {});

    return cart;
  } else return null;
};

const getCartById = async cartId => {
  return Cart.findById(cartId).exec();
};

const getCartByIdForOutsideWorld = async cartId => {
  let cart = await getCartById(cartId);

  cart = JSON.parse(JSON.stringify(cart));
  delete cart.status;
  delete cart.serverTime;
  cart.itemsQuantities = cart.itemsQuantities.reduce((acc, itemQuantity) => {
    acc[itemQuantity.item] = itemQuantity.quantity;
    return acc;
  }, {});

  return cart;
};

const incrementInCart = async (cartId, itemId) => {
  let [cart, item] = await Promise.all([
    getCartById(cartId),
    itemsRepository.getItemById(itemId)
  ]);
  if (!cart || !item || item.inventory === 0 || cart.status !== 'inProcess')
    return;

  let stringifiedCart = JSON.parse(JSON.stringify(cart));
  let itemInCart = stringifiedCart.itemsQuantities.find(
    item => item.item === itemId
  );
  if (itemInCart) itemInCart.quantity = itemInCart.quantity + 1;
  else {
    stringifiedCart.itemsQuantities.push({
      item: itemId,
      quantity: 1
    });
  }

  cart.itemsQuantities = stringifiedCart.itemsQuantities;
  cart.serverTime = Date();
  await Promise.all([
    cart.save(),
    itemsRepository.decrementItemInventory(itemId)
  ]);

  stringifiedCart.itemsQuantities = stringifiedCart.itemsQuantities.reduce(
    (acc, itemQuantity) => {
      acc[itemQuantity.item] = itemQuantity.quantity;
      return acc;
    },
    {}
  );

  delete stringifiedCart.status;
  delete stringifiedCart.serverTime;

  return stringifiedCart;
};

const decrementFromCart = async (cartId, itemId) => {
  let [cart, item] = await Promise.all([
    getCartById(cartId),
    itemsRepository.getItemById(itemId)
  ]);

  let stringifiedCart = JSON.parse(JSON.stringify(cart));
  let itemInCart = stringifiedCart.itemsQuantities.find(
    item => item.item === itemId
  );
  if (!cart || !item || cart.status !== 'inProcess' || !itemInCart) return;

  const itemOldQuantityInACart = itemInCart.quantity;

  if (itemOldQuantityInACart === 1) {
    stringifiedCart.itemsQuantities = stringifiedCart.itemsQuantities.filter(
      item => item.item !== itemId
    );
  } else itemInCart.quantity = itemOldQuantityInACart - 1;

  cart.itemsQuantities = stringifiedCart.itemsQuantities;
  cart.serverTime = Date();
  await Promise.all([
    cart.save(),
    itemsRepository.incrementItemInventory(itemId)
  ]);

  stringifiedCart.itemsQuantities = stringifiedCart.itemsQuantities.reduce(
    (acc, itemQuantity) => {
      acc[itemQuantity.item] = itemQuantity.quantity;
      return acc;
    },
    {}
  );

  delete stringifiedCart.status;
  delete stringifiedCart.serverTime;

  return stringifiedCart;
};

const changeCartStatus = async (cartId, status) => {
  let cart = await getCartById(cartId);
  cart.status = status;
  cart.serverTime = Date();
  return cart.save();
};

module.exports = {
  createCart,
  incrementInCart,
  decrementFromCart,
  changeCartStatus,
  getCartById,
  getCartByIdForOutsideWorld
};
