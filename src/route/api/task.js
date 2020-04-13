const express = require('express');
const { TaskController } = require('@controller');
const { TaskValidator, bodyValidator } = require('@validator');

class TaskRoutes {
  constructor() {
    this.router = express.Router();
    this._config();
  }

  _config() {
    this.router.post('/:id/create', bodyValidator(TaskValidator.task), TaskController.createTask);
    this.router.get('/:id/list',  TaskController.getTaskListByProjectId);
    this.router.delete('/',  TaskController.removeTask);
    this.router.put('/',  TaskController.editTask);
  }
}

module.exports = new TaskRoutes().router;
