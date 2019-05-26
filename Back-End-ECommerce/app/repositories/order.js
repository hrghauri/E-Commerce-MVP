const Order = require('../models/order');
const cartRepository = require('../repositories/cart');
const itemRepository = require('../repositories/items');
const emailService = require('../services/sendEmail');

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
  await order.save();
  await _createEmail(order._id, cartId, customerEmail, serverTime);
  return order;
};

const _createEmail = async (orderId, cartId, customerEmail, serverTime) => {
  try {
    const cart = await cartRepository.getCartByIdForOutsideWorld(cartId);
    console.log('cart', cart);

    let itemsBought = [];

    await Promise.all(
      Object.keys(cart.itemsQuantities).map(async currentItemKey => {
        const currentItem = await itemRepository.getItemByIdForOutsiderWorld(
          currentItemKey
        );
        itemsBought.push({
          title: currentItem.title,
          quantityBought: cart.itemsQuantities[currentItemKey],
          price: currentItem.price
        });
      })
    );

    const emailResult = await emailService.sendEmail(
      orderId,
      customerEmail,
      serverTime,
      itemsBought
    );
    console.log(emailResult);
  } catch (error) {
    console.log('error occured while sending email');
  }
};

module.exports = {
  createOrder
};
