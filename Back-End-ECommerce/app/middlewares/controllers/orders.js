const ordersRepository = require('../../repositories/order');

const createOrder = async (req, res, next) => {
  const cartId = req.body.cartId;
  const customerEmail = req.body.customerEmail;
  const clientTime = req.body.clientTime;
  const serverTime = Date();

  try {
    const result = await ordersRepository.createOrder(
      cartId,
      customerEmail,
      clientTime,
      serverTime
    );
    console.log(result);

    if (!result) {
      let error = new Error('cartId appears to be invalid');
      error.status = 400;
      next(error);
      return;
    }

    res.status(200).send({
      order: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder
};
