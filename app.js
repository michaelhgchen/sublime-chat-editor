var
  http          = require('http'),
  express       = require('express'),
  port          = require('./config').port,
  app           = express(),
  server        = http.Server(app),
  domainHandler = require('./lib/domain-handler')(server),
  io            = require('socket.io')(server),
  allUsers      = {};

// domain-handler creates an execution context that will catch errors
app.use(domainHandler);

// Static routing
app.use(express.static(__dirname + '/public'));

// Socket
io.on('connection', function (socket) {
  console.log('A user has connected');

  // Logging in
  socket.on('new user', function (username) {
    // If username is already in use, fail login
    if(allUsers[username]) {
      socket.emit('login fail', {
        error:'DUPLICATE'
      });

      return;
    }

    // Otherwise set socket username and store in allUsers
    socket.username    = username;
    allUsers[username] = username;

    socket.emit('login success', {
      username: username,
      allUsers: allUsers
    });

    socket.broadcast.emit('user joined', {
      username: username
    });
  });

  // Sending a message
  socket.on('new message', function (message) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: message
    });
  });

  // Typing
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // Disconnecting
  socket.on('disconnect', function () {
    console.log('A user has disconnected');

    if (socket.username) {
      // If socket had a username, delete it
      delete allUsers[socket.username];

      socket.broadcast.emit('user left', {
        username: socket.username
      });
    }
  });
});

server.listen(port, function() {
  console.log(
    'Express started in %s mode on port %d',
    app.get('env'),
    port
  );
});