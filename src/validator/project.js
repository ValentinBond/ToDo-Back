const Joi = require('joi');

const project = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string(),
});


module.exports = {
  project
};