const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
  const schema = {
    fullname: Joi.string().min(5).required(),
    email: Joi.string().min(7).required().email(),
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(7).required().email(),
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
