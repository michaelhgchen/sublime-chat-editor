var
  // Node
  http    = require('http'),
  domain  = require('domain'),
  cluster = require('cluster'),

  // Installed
  express        = require('express'),
  expressSession = require('express-session'),

  // Local
  secrets = require('./secrets'),
  config  = require('./config'),

  // Other
  port   = config.port,
  app    = express(),
  server = http.Server(app),
  io     = require('socket.io')(server),

  // 'Persistence'
  usernames = {},
  userCount = 0;

// A domain is an execution context that will catch errors that occur inside it
app.use(function(req, res, next) {
  var newDomain, killTimer, worker

  // Create a domain for this request
  newDomain = domain.create();

  // Handle errors that occur on this domain
  newDomain.on('error', function(err) {
    console.error('DOMAIN ERROR CAUGHT\n', err.stack);

    // We want to try to route user to the proper error page
    try {
      // Failsafe shutdown in 5 seconds
      killTimer = setTimeout(function() {
        process.exit(1);
      }, 5000);

      // If killTimer is only item left in event loop stop running program
      killTimer.unref();

      worker = cluster.worker;

      // Let master know this cluser is dead (trigger 'disconnect')
      if(worker) {
        worker.disconnect();
      }

      // Stop taking new requests
      server.close();

      // attempt Express error route with next
      try {
        next(err);

      // if failed, try plain node response
      } catch(err) {
        console.error('Express error routing failed.\n', err.stack);
        res.statusCode = 500;
        res.setHeader('content-type', 'text/plain');
        res.end('Server error.');
      }

      // if express and node both fail
    } catch(err) {
      console.error('Unable to send 500 response.\n', err.stack);
    }
  });

  // add request, response objects in domain
  newDomain.add(req);
  newDomain.add(res);

  // execute rest of chain in domain
  newDomain.run(next);
});

// Log which worker handles requests when clustering
app.use(function(req, res, next) {
  var cluster = require('cluster');

  if(cluster.isWorker) {
    console.log('Worker %d recieved request', cluster.worker.id);
  }

  next();
});

// Routing
app.use(express.static(__dirname + '/public'));

// Enable sessions
app.use(expressSession({
  secret: secrets.cookie,
  resave: true,
  saveUninitialized: true
}));

// On connection
io.on('connection', function (socket) {
  var addedUser;

  socket.on('new user', function (username) {
    socket.username     = username;
    usernames[username] = username;

    ++numUsers;
    addedUser = true;

    socket.emit('login', {
      numUsers: numUsers
    });

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on('new message', function (message) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: message
    });
  });

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

  socket.on('disconnect', function () {
    if (socket.username) {
      usernames[socket.username];
      --numUsers;

      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

// Server w/ app cluster support
function startServer() {
  server.listen(port, function() {
    console.log(
      'Express started in %s mode on port %d',
      app.get('env'),
      port
    );
  });
}

// Run application directly
if(require.main === module) {
  startServer();

// Otherwise export as a function to create the server
} else {
  module.exports = startServer;
}