var
  Socket        = require('../socket'),
  ServerActions = require('../actions/ServerActions');

Socket.on('chat:message-received', function(messageData) {
  ServerActions.receiveMessage(messageData);
});

module.exports = {
  sendMessage: function(message) {
    Socket.emit('chat:message-sent', message);
  }
}