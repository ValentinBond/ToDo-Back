const express = require('express');
const userRouter = require('./user');
const projectRouter = require('./project');
const taskRouter = require('./task');
const passport = require('passport');


class ApiRoutes {
  constructor() {
    this.router = express.Router();
    this._config();
  }

  _config() {
    this.router.use('/user', userRouter);
    this.router.use('/project', passport.authenticate('jwt', {session: false}), projectRouter);
    this.router.use('/task', passport.authenticate('jwt', {session: false}), taskRouter);
  }
}

module.exports = new ApiRoutes().router;