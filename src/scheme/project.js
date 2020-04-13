const { Schema, model } = require('mongoose');

const Project = {
  title:  String,
  description: String
};

module.exports = model('Project', new Schema(Project));