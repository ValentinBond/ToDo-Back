const express = require('express');
const { ProjectController } = require('@controller');
const { ProjectValidator, bodyValidator } = require('@validator');

class ProjectRoutes {
  constructor() {
    this.router = express.Router();
    this._config();
  }

  _config() {
    this.router.delete('/:id', ProjectController.removeProject);
    this.router.post('/create', bodyValidator(ProjectValidator.project), ProjectController.createProject);
    this.router.get('/list', ProjectController.getProjectList);
    this.router.put('/:id',  ProjectController.editProject);
  }
}

module.exports = new ProjectRoutes().router;
