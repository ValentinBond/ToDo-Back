const { Project } = require('@scheme');

class ProjectModel {

  getProjectList() {
    return Project.find({});
  }

  createProject(req) {
    const { title, description } = req.body;

    return Project.create({
      title,
      description
    });
  }

  removeProject(req) {
    const { id } = req.params;

    return Project.remove({
      _id: id
    });
  }

  editProject(req) {
    const { id } = req.params;
    const { title, description } = req.body;

    return Project.updateOne({ _id: id }, { title, description });
  }
}

module.exports = new ProjectModel();