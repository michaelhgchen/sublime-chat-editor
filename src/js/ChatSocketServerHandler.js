/**
 * Exports a function that takes in a socket as an argument and attaches
 * appropriate event handlers.  Called on socket connection event.
 */

var SocketEventsConstants = require('./constants/SocketEventsConstants');
var ClientConstants = SocketEventsConstants.Client;
var ServerConstants = SocketEventsConstants.Server;
var allUsers = {};

// ====================================
// general
// ====================================
// check if socket has a username attached to it ('logged in')
function isLoggedIn(socket) {
  return !!socket.username;
}

// check if username exists in user storage
function usernameIsUsed(username) {
  return !!allUsers[username];
}

// add username to user storage
function addUsername(username) {
  if(usernameIsUsed(username)) throw new Error('Username in use');
  allUsers[username] = username;
}

// remove username from user storage
function removeUsername(username) {
  if(!usernameIsUsed(username)) throw new Error('Username is not in use');
  delete allUsers[username];
}

// add username to socket and user storage
function login(socket, username) {
  addUsername(username);
  socket.username = username;
}

// remove username from socket and user storage
function logout(socket) {
  removeUsername(socket.username);
}

// ====================================
// client event handlers
// ====================================
function handleLogin(username) {
  if(usernameIsUsed(username)) {
    this.emit(
      ServerConstants.LOGIN_FAIL, {
        username: username,
      }
    );
  } else {
    login(this, username);

    this.emit(
      ServerConstants.LOGIN_SUCCESS, {
        username: username
      }
    );

    this.broadcast.emit(
      ServerConstants.USER_CONNECT, {
        username: username
      }
    );
  }
}

// inform other users of a new message
function handleSendMessage(message) {
  this.broadcast.emit(
    ServerConstants.USER_MESSAGE, {
      username: this.username,
      message: message
    }
  );
}

// inform other users of a user typing
function handleTyping() {
  this.broadcast.emit(
    ServerConstants.USER_TYPING, {
      username: this.username
    }
  );
}

// inform other users a user stopped typing
function handleStopTyping() {
  this.broadcast.emit(
    ServerConstants.USER_STOP_TYPING, {
      username: this.username
    }
  );
}

// inform other users of a disconnect
function handleDisconnect() {
  console.log(Date(), ':', this.username, 'has disconnected\n');

  if(isLoggedIn(this)) {
    logout(this);

    this.broadcast.emit(
      ServerConstants.USER_DISCONNECT, {
        username: this.username
      }
    );
  }
}

// initialization on connection
function init(socket) {
  socket.emit(
    ServerConstants.INIT, {
      allUsers: allUsers
    }
  );
}

function ChatSocketServerHandler(socket) {
  console.log(Date(), ': A user has connected\n');

  init(socket);
  socket.on(ClientConstants.LOGIN, handleLogin);
  socket.on(ClientConstants.SEND_MESSAGE, handleSendMessage);
  socket.on(ClientConstants.TYPING, handleTyping);
  socket.on(ClientConstants.STOP_TYPING, handleStopTyping);
  socket.on('disconnect', handleDisconnect);
}

module.exports = ChatSocketServerHandler;