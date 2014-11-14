var http = require('http');
var express = require('express');
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main'
});

var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

var port = require('./config.js').port;
var DomainHandler = require('./lib/DomainHandler')(server);
var ChatSocketServerHandler = require('./lib/ChatSocketServerHandler');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// create an execution context to handle errors
app.use(DomainHandler);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('home', {
    react: ''
  });
});

io.on('connection', ChatSocketServerHandler);

server.listen(port, function() {
  console.log('Express started in %s mode on port %d', app.get('env'), port);
});

// var react = require('react');
// react.renderToString(ChatApp({})) // render react app to HTML