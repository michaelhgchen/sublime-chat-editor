// return the appropriate HTML string based on type + message data
// currently uses JS syntax coloring
var MessageTypes = require('../constants/FluxConstants').MessageTypes;
var JSSyntaxifyPasses = require('./JSSyntaxifyPasses');
var syntaxify = require('./Syntaxify')(JSSyntaxifyPasses);
var messageCount = 0;

var MessageUtil = {
  convertRawMessage: function(type, data) {
    var convertedMessage;

    switch(type) {
      case MessageTypes.JOIN:
        // TODO: load script string
        convertedMessage = "var http = require('http');\n\
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
          });";
        break;

      case MessageTypes.ADD_USER:
        convertedMessage = "\nthis['" + data.username + "'] = new User();";
        break;

      case MessageTypes.REMOVE_USER:
        convertedMessage = "\ndelete this['" + data.username + "'];";
        break;

      case MessageTypes.TYPING:
        convertedMessage = '\n// ' + data.message;
        break;

      case MessageTypes.SEND:
      case MessageTypes.RECEIVE:
        convertedMessage = '\n// ' + data.username + '\n' + data.message;
        break;

      case MessageTypes.CONTINUE:
        convertedMessage = data.message;
        break;

      case MessageTypes.END:
        convertedMessage = '}\n';
        break;

      default:
        convertedMessage = data.message;
        break;
    }

    return syntaxify.toHTMLString(convertedMessage);
  }
}

module.exports = MessageUtil;