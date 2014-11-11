var
  http          = require('http'),
  express       = require('express'),
  port          = require('./config').port,
  app           = express(),
  server        = http.Server(app),
  handlebars    = require('express-handlebars').create({
    defaultLayout: 'main'
  }),
  domainHandler = require('./lib/domain-handler')(server),
  io            = require('socket.io')(server),
  allUsers      = {},
  React         = require('react'),
  ChatApp       = require('./server-react/components/ChatApp.react');

// Set templating engine and default engine extension to Handlebars's
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Create an execution context that will catch errors
app.use(domainHandler);

// Static routing
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  // Render React App
  res.render('home', {
    react: React.renderToString(ChatApp({}))
  });
});

// Socket logic
io.on('connection', function (socket) {
  if(!socket.username) {
    socket.emit('no username');
  }

  // Logging in
  socket.on('new user', function (username) {
    // If username is already in use, fail login
    if(allUsers[username]) {
      socket.emit('login fail', {
        error:'DUPLICATE'
      });

      return;
    } else if (!username) {
      socket.emit('login fail', {
        error:'INVALID NAME'
      });
    }

    // Otherwise the name assignment is successful
    console.log((new Date()).toString(), ':', username, 'has joined');

    // Set name in socket and store in allUsers
    socket.username    = username;
    allUsers[username] = username;

    // Let user know they have joined
    socket.emit('login success', {
      username: username,
      allUsers: allUsers
    });

    // Let other users know user has joined
    socket.broadcast.emit('user joined', {
      username: username
    });
  });

  // Users receive a new message
  socket.on('new message', function (message) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: message
    });
  });

  // A user is typing
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // A user has stopped typing
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // Disconnecting
  socket.on('disconnect', function () {
    console.log('A user has disconnected');

    if (socket.username) {
      console.log((new Date()).toString(), ':', socket.username, 'has left');

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