const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const validateCreateCart = (req, res, next) => {
  if (Object.keys(req.body).length == 1 && req.body.itemId) {
    const schema = {
      itemId: Joi.objectId().required()
    };

    Joi.validate(
      {
        itemId: req.body.itemId
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

const validateGetCart = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    let error = new Error('Invalid Request');
    error.status = 400;
    return next(error);
  }

  const schema = {
    cartId: Joi.objectId().required()
  };

  Joi.validate(
    {
      cartId: req.params.cartId
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
};

const validateCartModifyingRequests = (req, res, next) => {
  if (Object.keys(req.body).length == 1 && req.body.itemId) {
    const schema = {
      itemId: Joi.objectId().required(),
      cartId: Joi.objectId().required()
    };

    Joi.validate(
      {
        itemId: req.body.itemId,
        cartId: req.params.cartId
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
  validateCreateCart,
  validateGetCart,
  validateCartModifyingRequests
};
