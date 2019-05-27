const express = require('express');
const ordersController = require('../middlewares/controllers/orders');
const ordersValidator = require('../middlewares/validators/order');

const ordersRouter = express.Router();

ordersRouter.post(
  '/',
  ordersValidator.validateCreateOrder,
  ordersController.createOrder
);

module.exports = ordersRouter;
