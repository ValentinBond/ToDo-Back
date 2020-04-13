const { ProjectModel } = require('@model');

class ProjectController  {
  async createProject(req, res) {
    try {
      const createdProject = await ProjectModel.createProject(req);
      const projectList = await ProjectModel.getProjectList();

      global.io.emit('projects', { data: { projectList } });

      return res.json({ createdProject });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getProjectList(req, res) {
    try {
      const projectList = await ProjectModel.getProjectList();

      return res.json({ projectList });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async removeProject(req, res) {
    try {
      const removedProject = await ProjectModel.removeProject(req);
      const projectList = await ProjectModel.getProjectList();

      global.io.emit('projects', { data: { projectList } });

      return res.json({ removedProject });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async editProject(req, res) {
    try{
      const editedProject = await ProjectModel.editProject(req);
      const projectList = await ProjectModel.getProjectList();

      global.io.emit('projects', { data: { projectList } });

      return res.json({ editedProject });
    } catch (err) {
      res.status(400).send(err);
    }
  }

}

module.exports = new ProjectController();