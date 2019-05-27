const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const validateCreateOrder = (req, res, next) => {
  if (
    Object.keys(req.body).length == 3 &&
    req.body.cartId &&
    req.body.customerEmail &&
    req.body.clientTime
  ) {
    const schema = {
      cartId: Joi.objectId().required(),
      customerEmail: Joi.string()
        .email()
        .required(),
      clientTime: Joi.string().required()
    };

    Joi.validate(
      {
        cartId: req.body.cartId,
        customerEmail: req.body.customerEmail,
        clientTime: req.body.clientTime
      },
      schema,
      function(err, value) {
        if (err) {
          return next(err);
        } else {
          return next();
        }
      }
    );
  } else {
    let error = new Error('Invalid Request');
    error.status = 400;
    return next(error);
  }
};

module.exports = {
  validateCreateOrder
};
