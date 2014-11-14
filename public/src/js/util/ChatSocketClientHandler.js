var ServerActions = require('../actions/ServerActions');
var ChatSocketConstants = require('../constants/chat-socket-constants');
var ClientSocketConstants = ChatSocketConstants.client;
var ServerSocketConstants = ChatSocketConstants.server;
var Socket;

// naive check for browser vs. node execution (for server-side rendering)
try {
  if(window !== undefined) {
    Socket = module.exports = require('socket.io-client')();

    Socket.on(
      ServerSocketConstants.SET_USERNAME_FAIL,
      function(data) {
        ServerActions.failLogin(data);
      }
    );

    // return data with login name, list of users, number of users
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
  }
} catch(e) {}

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