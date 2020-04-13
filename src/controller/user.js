const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('@model');
require('dotenv').config();

class UserController  {

  async registration(req, res) {
    try {
      const createdUser = await UserModel.registration(req);

      const token = jwt.sign({
        email: createdUser.email,
        id: createdUser._id,
      }, process.env.SALT, {expiresIn: '100h'});

      return res.json({ result: { token } });
    } catch (err) {
      if(err.code === 11000) {
        res.status(400).send({ errors: {
          email: `This email address already exists`
        } });
      }
      res.status(400).send(err);
    }
  }

  async login(req, res) {
    try {
      const {
        password
      } = req.body;

      const availableUser = await UserModel.login(req);

      if (!availableUser) {
        return res.status(400).send({errors: { email: 'There is no such user in the system' } });
      }

      const checkUser = await bcrypt.compare(password, availableUser.hash);

      if (!checkUser) {
        return res.status(400).send({errors: { password: 'Password is incorrect please try again' }});
      }

      const token = jwt.sign({
        email: availableUser.email,
        id: availableUser._id,
      }, process.env.SALT, {expiresIn: '100h'});

      return res.json({token, message: 'Login successful'});
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  }

  async getUserList(req, res) {
    try{
      const userList = await UserModel.getUserList(req);

      return res.json({ userList });
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  }
}

module.exports = new UserController();