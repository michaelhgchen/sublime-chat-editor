var Socket = require('socket.io-client')();
var ServerActions = require('./actions/ServerActions');
var SocketEventsConstants = require('./constants/SocketEventsConstants');
var ClientSocketConstants = SocketEventsConstants.Client;
var ServerSocketConstants = SocketEventsConstants.Server;

// socket events call server actions
Socket.on(
  ServerSocketConstants.SET_USERNAME,
  function(data) {
    ServerActions.setUsername(data);
  }
);

Socket.on(
  ServerSocketConstants.SET_USERNAME_FAIL,
  function(data) {
    ServerActions.failSetUsername(data);
  }
);

Socket.on(
  ServerSocketConstants.USER_CONNECT,
  function(data) {
    ServerActions.addUser(data);
  }
);

Socket.on(
  ServerSocketConstants.USER_DISCONNECT,
  function(data) {
    ServerActions.removeUser(data);
  }
);

Socket.on(
  ServerSocketConstants.USER_MESSAGE,
  function(data) {
    ServerActions.addMessage(data);
  }
);

Socket.on(
  ServerSocketConstants.USER_TYPING,
  function(data) {
    ServerActions.addTypingUser(data);
  }
);

Socket.on(
  ServerSocketConstants.USER_STOP_TYPING,
  function(data) {
    ServerActions.removeTypingUser(data);
  }
);

// actions to send events to server (link to view actions)
var ChatSocketClientHandler = {
  setUsername: function(username) {
    Socket.emit(ClientSocketConstants.SET_USERNAME, username);
  },

  sendMessage: function(message) {
    Socket.emit(ClientSocketConstants.SEND_MESSAGE, message);
  },

  type: function() {
    Socket.emit(ClientSocketConstants.TYPING);
  },

  stopTyping: function() {
    Socket.emit(ClientSocketConstants.STOP_TYPING);
  }
}

module.exports = ChatSocketClientHandler;