const express = require('express');
const itemsController = require('../controllers/items');

const itemsRouter = express.Router();

itemsRouter.get('/', itemsController.getAllItems);
itemsRouter.get('/:itemId', itemsController.getItemById);
itemsRouter.post('/', itemsController.createItem);

module.exports = itemsRouter;
