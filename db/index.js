const mongoose = require('mongoose');
mongoose.promise = global.Promise;
mongoose.set('debug', true);

class MongoDbConnect {
  constructor(url) {
    this.url = url;
  }

  connect() {
    mongoose.connection
      .on('error', error => console.log(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
      });
    mongoose.connect(this.url, {useNewUrlParser: true});
  }
}

module.exports = MongoDbConnect;