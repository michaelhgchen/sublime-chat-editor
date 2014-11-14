var http = require('http');
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var port = require('./config.js').port;

// load pre-rendered react app and server-side socket handler
var ServerReactApp = require('./src/js/ServerReactApp');
var ChatSocketServerHandler = require('./src/js/ChatSocketServerHandler');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('react', {
    react: ServerReactApp
  });
});

io.on('connection', ChatSocketServerHandler);

server.listen(port, function() {
  console.log('Express started in %s mode on port %d', app.get('env'), port);
});