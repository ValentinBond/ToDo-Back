const { Schema, model, Types } = require('mongoose');

const Task = {
  project: {
    type: Types.ObjectId,
    ref: 'Project'
  },
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  status: {
    type: String,
    enum : ['done','open'],
    default: 'open'
  }
};

module.exports = model('Task', new Schema(Task));