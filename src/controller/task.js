const { TaskModel } = require('@model');

class TaskController  {
  async createTask(req, res) {
    try {
      const { id } = req.params;
      const createdTask = await TaskModel.createTask(req);
      const taskList = await TaskModel.getTaskListByProjectId(req);

      global.io.emit(`tasks${id}`, { data: { taskList } });

      return res.json({ createdTask });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async removeTask(req, res) {
    try {
      const { projectId } = req.query;

      const removedTask = await TaskModel.removeTask(req);
      const taskList = await TaskModel.getTaskListByProjectId(req);

      global.io.emit(`tasks${projectId}`, { data: { taskList } });

      return res.json({ removedTask });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getTaskListByProjectId(req, res) {
    try {
      const taskList = await TaskModel.getTaskListByProjectId(req);

      return res.json({ taskList });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async editTask(req, res) {
    try {
      const { projectId } = req.query;
      const editedTask = await TaskModel.editTask(req);
      const taskList = await TaskModel.getTaskListByProjectId(req);

      global.io.emit(`tasks${projectId}`, { data: { taskList } });

      return res.json({ editedTask });
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

module.exports = new TaskController();