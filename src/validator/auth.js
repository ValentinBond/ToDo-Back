const Joi = require('joi');

const auth = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});


module.exports = {
  auth
};