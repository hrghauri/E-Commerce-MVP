const express = require('express');
const cartsController = require('../controllers/carts');

const cartsRouter = express.Router();

cartsRouter.post('/', cartsController.createCart);

cartsRouter.patch('/:cartId', cartsController.incrementInCart);

cartsRouter.delete('/:cartId', cartsController.decrementFromCart);

module.exports = cartsRouter;
