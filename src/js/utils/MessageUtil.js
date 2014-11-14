var MessageTypes = require('../constants/FluxConstants').MessageTypes;
var MessageParser = require('./MessageParser');

var MessageUtil = {
  convertRawMessage: function(type, username, message) {
    var convertedMessage;

    switch(type) {
      case MessageTypes.JOIN:
        convertedMessage = MessageParser('\
          function User(){}\n\
          \n\
          User.prototoype.send = User.prototype.read = function(message) {\n\
          {{indent}}console.log(message);\n\
          \n\
          }');
        break;

      case MessageTypes.ADD_USER:
        convertedMessage = message;
        break;

      case MessageTypes.REMOVE_USER:
        convertedMessage = message;
        break;

      case MessageTypes.TYPING:
        convertedMessage = message;
        break;

      case MessageTypes.SEND:
        convertedMessage = message;
        break;

      case MessageTypes.RECEIVE:
        convertedMessage = message;
        break;

      default:
        convertedMessage = message;
        break;
    }

    return convertedMessage;
  }
}

module.exports = MessageUtil;