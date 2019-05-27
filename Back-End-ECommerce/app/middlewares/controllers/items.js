const itemsRepository = require('../../repositories/items');

const getAllItems = async (req, res, next) => {
  try {
    const result = await itemsRepository.getAllItems();

    return res.status(200).send({ items: result });
  } catch (error) {
    return next(error);
  }
};
const getItemById = async (req, res, next) => {
  const itemId = req.params.itemId;
  try {
    const result = await itemsRepository.getItemById(itemId);
    if (!result) {
      let error = new Error('Item does not exist');
      error.status = 404;
      return next(error);
    }
    return res.status(200).send({ item: result });
  } catch (error) {
    return next(error);
  }
};

const createItem = async (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const inventory = req.body.inventory;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  console.log('hellloo', imageUrl);

  try {
    const result = await itemsRepository.createItem(
      title,
      price,
      inventory,
      description,
      imageUrl
    );
    return res.status(200).send({ item: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem
};
