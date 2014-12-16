// return the appropriate HTML string based on type + message data
// currently uses JS syntax coloring

var MessageTypes = require('../constants/FluxConstants').MessageTypes;
var MessageParser = require('./MessageParser');

var MessageUtil = {
  convertRawMessage: function(type, username, message) {
    var convertedMessage;

    switch(type) {
      case MessageTypes.JOIN:
        convertedMessage = MessageParser(
"var http = require('http');\n\
var express = require('express');\n\
var handlebars = require('express-handlebars').create({defaultLayout:'main'});\n\
var app = express();\n\
var server = http.Server(app);\n\
var io = require('socket.io')(server);\n\
var port = require('./config.js').port;\n\
\n\
// load pre-rendered react app and server-side socket handler\n\
var ServerReactApp = require('./src/js/ServerReactApp');\n\
var ChatSocketServerHandler = require('./src/js/ChatSocketServerHandler');\n\
\n\
app.engine('handlebars', handlebars.engine);\n\
app.set('view engine', 'handlebars');\n\
\n\
app.use(express.static(__dirname + '/public'));\n\
\n\
app.get('/', function(req, res) {\n\
{{indent}}res.render('react', {\n\
{{indent}}{{indent}}react: ServerReactApp\n\
{{indent}}});\n\
});\n\
\n\
io.on('connection', ChatSocketServerHandler);\n\
\n\
server.listen(port, function() {\n\
{{indent}}console.log('Express started in %s mode on port %d', app.get('env'), port);\n\
});\n\
");
        break;

      case MessageTypes.ADD_USER:
        convertedMessage = MessageParser("this['" + username + "'] = new User();\n");
        break;

      case MessageTypes.REMOVE_USER:
        convertedMessage = MessageParser("delete this['" + username + "'];\n");
        break;

      case MessageTypes.TYPING:
        convertedMessage = MessageParser('// ' + message);
        break;

      case MessageTypes.SEND:
        convertedMessage = MessageParser('/* me */ ' + message);
        break;

      case MessageTypes.RECEIVE:
        convertedMessage = MessageParser("'"+ username + "' + " + message);
        break;

      default:
        convertedMessage = MessageParser(message) + '\n';
        break;
    }

    return convertedMessage;
  }
}

module.exports = MessageUtil;