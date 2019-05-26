const express = require('express');
const cartsController = require('../controllers/carts');

const cartsRouter = express.Router();

cartsRouter.post('/', cartsController.createCart);

cartsRouter.get('/:cartId', cartsController.getCartById);

cartsRouter.patch('/:cartId', cartsController.incrementInCart);

cartsRouter.delete('/:cartId', cartsController.decrementFromCart);

module.exports = cartsRouter;
