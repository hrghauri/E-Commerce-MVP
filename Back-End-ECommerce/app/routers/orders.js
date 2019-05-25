const express = require('express');
const ordersController = require('../controllers/orders');

const ordersRouter = express.Router();

ordersRouter.post('/', ordersController.createOrder);

module.exports = ordersRouter;
