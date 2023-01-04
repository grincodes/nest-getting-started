import Joi = require("joi");


export const createCatSchema = Joi.object({
  name: Joi.string().required(),
  breed: Joi.string(),
  age: Joi.number().integer(),

})
