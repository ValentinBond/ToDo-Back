const express = require('express');
const userRouter = require('./user');
const projectRouter = require('./project');
const taskRouter = require('./task');

class ApiRoutes {
  constructor() {
    this.router = express.Router();
    this._config();
  }

  _config() {
    this.router.use('/user', userRouter);
    this.router.use('/project', projectRouter);
    this.router.use('/task', taskRouter);
  }
}

module.exports = new ApiRoutes().router;