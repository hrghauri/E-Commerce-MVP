const express = require('express');
const itemsController = require('../middlewares/controllers/items');
const itemsValidator = require('../middlewares/validators/item');

const itemsRouter = express.Router();

itemsRouter.get(
  '/',
  itemsValidator.validateGetItems,
  itemsController.getAllItems
);
itemsRouter.get(
  '/:itemId',
  itemsValidator.validateGetItem,
  itemsController.getItemById
);
// itemsRouter.post('/', itemsController.createItem);

module.exports = itemsRouter;
