const Joi = require('joi');

const recipeSchema = Joi.object({
  name:         Joi.string().required(),
  photo_link:   Joi.string().required(),
  meal_time:    Joi.number().integer().required(),
  max_imc:      Joi.number().integer().required(),
  type:         Joi.number().integer().required(),
  steps_desc:   Joi.string().required(),
  ingredient_desc: Joi.string().required(),
}).required();

module.exports = recipeSchema;