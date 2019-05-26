const cartsRepository = require('../repositories/cart');

const createCart = async (req, res, next) => {
  console.log(req.body);
  const itemId = req.body.itemId;
  console.log(itemId);

  try {
    const result = await cartsRepository.createCart(itemId);
    if (!result) {
      let error = new Error('item may have been invalid or is out of stock');
      error.status = 400;
      next(error);
      return;
    }
    res.status(200).send({ cart: result });
  } catch (error) {
    next(error);
  }
};

const incrementInCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const itemId = req.body.itemId;

  try {
    const result = await cartsRepository.incrementInCart(cartId, itemId);
    if (!result) {
      let error = new Error(
        'item may have been invalid, out of stock or you have provided an invalid cartId'
      );
      error.status = 400;
      next(error);
      return;
    }

    res.status(200).send({ cart: result });
  } catch (error) {
    next(error);
  }
};
const decrementFromCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const itemId = req.body.itemId;

  try {
    const result = await cartsRepository.decrementFromCart(cartId, itemId);
    if (!result) {
      let error = new Error(
        'item may have been invalid, you may be trying to remove an unexisting item from your cart or you have provided an invalid cartId'
      );
      error.status = 400;
      next(error);
      return;
    }
    res.status(200).send({ cart: result });
  } catch (error) {
    next(error);
  }
};

const getCartById = async (req, res, next) => {
  const cartId = req.params.cartId;
  try {
    const result = await cartsRepository.getCartByIdForOutsideWorld(cartId);
    if (!result) {
      let error = new Error('Cart does not exist');
      error.status = 404;
      return next(error);
    }
    return res.status(200).send({ cart: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  incrementInCart,
  decrementFromCart,
  getCartById
};
