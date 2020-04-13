const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/route');
const passport = require('passport');
const MongoDbConnect = require('./db');
require('dotenv').config();

class App {
  constructor() {
    this.dbConnect = new MongoDbConnect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    this.app = express();
    this._config();
  }

  static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }

    return App.instance;
  }


  _config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(passport.initialize());
    this.app.use('/', routes);
    this.dbConnect.connect();
  }
}

module.exports = App.getInstance().app;
