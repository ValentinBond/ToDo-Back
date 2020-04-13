const { Schema, Types, model } =  require('mongoose');

const User = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: String
};

module.exports =  model('User', new Schema(User));