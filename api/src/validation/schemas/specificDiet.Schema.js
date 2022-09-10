const Joi = require('joi');

const specific_Diet_Schema = Joi.object({
  name: Joi.string().required(),
}).required();

module.exports = specific_Diet_Schema;