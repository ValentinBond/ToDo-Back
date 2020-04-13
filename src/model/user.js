const { User } = require('@scheme');
const bcrypt = require('bcrypt');
const jwtDecode = require('jwt-decode');
require('dotenv').config();

class UserModel {

  async registration(req) {
    const {
      email,
      password
    } = req.body;

    const hash = await bcrypt.hash(password, process.env.SALT);

    const newUser = {
      email,
      hash
    };

    return User.create(newUser);
  }

  async login(req) {
    const {
      email
    } = req.body;

    return User.findOne({
      email
    })
  }

  getUserList(req) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const decode = jwtDecode(token);

    return User.where( {_id : {'$ne': decode.id }}).select('email')
  }
}

module.exports = new UserModel();