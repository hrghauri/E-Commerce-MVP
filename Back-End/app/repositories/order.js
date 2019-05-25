const Order = require('../models/order');
const cartRepository = require('../repositories/cart');

const createOrder = async (cartId, customerEmail, clientTime, serverTime) => {
  try {
    const result = await cartRepository.changeCartStatus(cartId, 'completed');
    if (!result) return;
  } catch (error) {
    return;
  }

  const order = new Order({
    cart: cartId,
    customerEmail,
    clientTime,
    serverTime
  });

  return order.save();
};

module.exports = {
  createOrder
};
