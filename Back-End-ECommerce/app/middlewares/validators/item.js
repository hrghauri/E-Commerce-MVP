const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const validateGetItem = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    let error = new Error('Invalid Request');
    error.status = 400;
    return next(error);
  }

  const schema = {
    itemId: Joi.objectId().required()
  };

  Joi.validate(
    {
      itemId: req.params.itemId
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

const validateGetItems = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    let error = new Error('Invalid Request');
    error.status = 400;
    return next(error);
  }
  next();
};

module.exports = {
  validateGetItem,
  validateGetItems
};
