const express = require('express');
const { UserController } = require('@controller');
const { AuthValidator, bodyValidator } = require('@validator');

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this._config();
  }

  _config() {
    this.router.post('/registration', bodyValidator(AuthValidator.auth), UserController.registration);
    this.router.post('/login', bodyValidator(AuthValidator.auth), UserController.login);
    this.router.get('/list', UserController.getUserList);
  }
}

module.exports = new UserRoutes().router;
