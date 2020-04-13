const Joi = require('joi');

const task = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  assignedTo: Joi.string().required(),
  status: Joi.string()
});


module.exports = {
  task
};