var Socket = require('socket.io-client')();
var ServerActions = require('./actions/ServerActions');
var SocketEventsConstants = require('./constants/SocketEventsConstants');
var ClientSocketConstants = SocketEventsConstants.client;
var ServerSocketConstants = SocketEventsConstants.server;

// socket events call server actions
Socket.on(
  ServerSocketConstants.SET_USERNAME_FAIL,
  function(data) {
    ServerActions.failLogin(data);
  }
);

Socket.on(
  ServerSocketConstants.SET_USERNAME_SUCCESS,
  function(data) {
    ServerActions.login(data);
  }
);

Socket.on(
  ServerSocketConstants.USER_CONNECT,
  function(data) {
    ServerActions.joinUser(data);
  }
);

Socket.on(
  ServerSocketConstants.USER_DISCONNECT,
  function(data) {
    ServerActions.leaveUser(data);
  }
);

Socket.on(
  ServerSocketConstants.USER_MESSAGE,
  function(data) {
    ServerActions.newMessage(data);
  }
);

Socket.on(
  ServerSocketConstants.USER_TYPING,
  function(data) {
    ServerActions.typing(data);
  }
);

Socket.on(
  ServerSocketConstants.USER_STOP_TYPING,
  function(data) {
    ServerActions.stopTyping(data);
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