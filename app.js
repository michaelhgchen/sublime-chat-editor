var
  // Node
  http    = require('http'),
  domain  = require('domain'),
  cluster = require('cluster'),

  // Installed
  express        = require('express'),
  mongoose       = require('mongoose'),
  cookieParser   = require('cookie-parser'),
  expressSession = require('express-session'),
  handlebars     = require('express-handlebars').create({
  defaultLayout: 'main',
    helpers: {
      // Allow nested views to add content to parents
      section: function(name, options) {
        this._sections = this._sections || {};
        this._sections[name] = options.fn(this);
      }
    }
  }),

  // Local
  secrets = require('./secrets'),
  routes  = require('./routes'),
  config  = require('./config'),

  // Other
  port   = config.port,
  app    = express(),
  server = http.Server(app),
  io     = require('socket.io')(server);

// ============================================================================
// Configuration
// ============================================================================
// Set templating engine to Handlebars's
app.engine('handlebars', handlebars.engine);

// Set handlerbars as default engine extension
app.set('view engine', 'handlebars');

// Connect to database
// mongoose.connect(secrets.mongo.development.URI, config.mongo);

// ============================================================================
// Middleware
// ============================================================================
// A domain is an execution context that will catch errors that occur inside it
// so instead of having one global uncaught exception handler, you can have as
// many through domains as you want.  (100% uptime!)
app.use(function(req, res, next) {
  var newDomain, killTimer, worker

  // Create a domain for this request
  var newDomain = domain.create();

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

app.use(express.static(__dirname + '/public'));

// Cookie getters/setters through res.cookie
app.use(cookieParser(secrets.cookie));

// Enable sessions
app.use(expressSession({
  secret: secrets.cookie,
  resave: true,
  saveUninitialized: true
}));

// ============================================================================
// Locals
// ============================================================================
app.use(function(req, res, next) {
  res.locals.testing = app.get('env') !== 'production'
    && (req.query.test === '1' || req.query.grep);

  next();
});

// ============================================================================
// Socket
// ============================================================================
var nameMap = {};

io.on('connection', function(socket) {
  console.log(socket.id);
  console.log('A user has connected');

  socket.on('chat:message-sent', function(message) {
    io.emit('chat:message-received', {
      author: nameMap[socket.id] || 'Anonymous',
      message: message
    });
  });

  socket.on('chat:name-set', function(name) {
    nameMap[socket.id] = name;
  });

  socket.on('disconnect', function() {
    console.log('A user has disconnected');
  });
});

// ============================================================================
// Routing
// ============================================================================
routes(app);

// ============================================================================
// Error handling
// ============================================================================
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// ============================================================================
// Server w/ app cluster support
// ============================================================================
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