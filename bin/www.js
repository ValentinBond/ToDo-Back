require('module-alias/register');
require('dotenv').config();

const app = require('../app');

require('../utils/passportConfig');

const http = require('http');

const port = process.env.PORT || '8000';

app.set('port', port);

const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', function(socket){
  global.io = socket;
  socket.on("disconnect", (e) => console.log("Client disconnected", e));
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}