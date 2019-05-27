const express = require('express');
const cartsController = require('../middlewares/controllers/carts');
const cartsValidator = require('../middlewares/validators/cart');

const cartsRouter = express.Router();

cartsRouter.post(
  '/',
  cartsValidator.validateCreateCart,
  cartsController.createCart
);

cartsRouter.get(
  '/:cartId',
  cartsValidator.validateGetCart,
  cartsController.getCartById
);

cartsRouter.patch(
  '/:cartId',
  cartsValidator.validateCartModifyingRequests,
  cartsController.incrementInCart
);

cartsRouter.delete(
  '/:cartId',
  cartsValidator.validateCartModifyingRequests,
  cartsController.decrementFromCart
);

module.exports = cartsRouter;
