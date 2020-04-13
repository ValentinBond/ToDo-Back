const { Task } = require('@scheme');

class TaskModel {

  getTaskListByProjectId(req) {
    const { id } = req.params;
    const { projectId } = req.query;

    return Task.find({ project: id || projectId }).populate('user', '_id email');
  }

  removeTask(req) {
    const { taskId, projectId } = req.query;

    return Task.remove({
      project: projectId,
      _id: taskId,
    });
  }

  createTask(req) {
    const { title, description, assignedTo } = req.body;
    const { id } = req.params;

    return Task.create({
      title,
      description,
      project: id,
      user: assignedTo
    });
  }

  editTask(req) {
    const { taskId, projectId } = req.query;
    const { title, description, assignedTo, status } = req.body;

    return Task.updateOne({ _id: taskId, project: projectId }, {
      title,
      description,
      user: assignedTo,
      status
    });
  }

}

module.exports = new TaskModel();