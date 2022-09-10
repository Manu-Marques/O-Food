const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required();

module.exports = userSchema;