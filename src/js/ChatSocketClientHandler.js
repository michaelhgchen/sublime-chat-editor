var Socket = require('socket.io-client')();
var ServerActions = require('./actions/ServerActions');
var SocketEventsConstants = require('./constants/SocketEventsConstants');
var ClientConstants = SocketEventsConstants.Client;
var ServerConstants = SocketEventsConstants.Server;
var currentUsername;

// ====================================
// events to emit
// ====================================
var ChatSocketClientHandler = {
  login: function(username) {
    Socket.emit(ClientConstants.LOGIN, username);
  },

  sendMessage: function(message) {
    Socket.emit(ClientConstants.SEND_MESSAGE, message);
  },

  type: function() {
    Socket.emit(ClientConstants.TYPING);
  },

  stopTyping: function() {
    Socket.emit(ClientConstants.STOP_TYPING);
  }
};

// ====================================
// general
// ====================================
function isLoggedIn() {
  return !!currentUsername;
}

// set client-side login state
function login(username) {
  currentUsername = username;
}

function logout() {
  currentUsername = undefined;
  ServerActions.logout();
}

// ====================================
// handle built-in events
// ====================================
// on disconnect with server
Socket.on(
  'disconnect',
  function() {
    if(isLoggedIn()) console.log('disconnected');
  }
);

// on reconnect with server, login with server again
Socket.on(
  'reconnect',
  function() {
    if(isLoggedIn()) {
      console.log('reconnected');
      ChatSocketClientHandler.login(currentUsername);
    }
  }
);

// if failed reconnect when logged in, logout
Socket.on(
  'reconnect_failed',
  function() {
    if(isLoggedIn()) {
      console.log('reconnection failed');
      logout();
    }
  }
);

// ====================================
// handle server events
// ====================================
// login success
Socket.on(
  ServerConstants.LOGIN_SUCCESS,
  function(data) {
    ServerActions.login(data);
    login(data.username);
  }
);

// login fail
Socket.on(
  ServerConstants.LOGIN_FAIL,
  function(data) {
    ServerActions.failSetUsername(data);
  }
);

// another user has connected
Socket.on(
  ServerConstants.USER_CONNECT,
  function(data) {
    ServerActions.addUser(data);
  }
);

// another user has disconnected
Socket.on(
  ServerConstants.USER_DISCONNECT,
  function(data) {
    ServerActions.removeUser(data);
  }
);

// another user has sent a message
Socket.on(
  ServerConstants.USER_MESSAGE,
  function(data) {
    ServerActions.addMessage(data);
  }
);

// another user is typing
Socket.on(
  ServerConstants.USER_TYPING,
  function(data) {
    ServerActions.addTypingUser(data);
  }
);

// another user has stopped typing
Socket.on(
  ServerConstants.USER_STOP_TYPING,
  function(data) {
    ServerActions.removeTypingUser(data);
  }
);

module.exports = ChatSocketClientHandler;