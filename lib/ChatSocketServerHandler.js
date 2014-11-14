var ChatSocketConstants = require('../constants/ChatSocketConstants');
var ClientConstants = ChatSocketConstants.client;
var ServerConstants = ChatSocketConstants.server;
var allUsers = {};

function ChatSocketServerHandler (socket) {
  // user tries to set a username
  socket.on(ClientConstants.SET_USERNAME, function (username) {
    // if name is already used emit error
    if(allUsers[username]) {
      socket.emit(
        ServerConstants.SET_USERNAME_FAIL, {
          username: username,
          error: 'duplicate'
        }
      );

      return;
    }

    // otherwise set name in socket and allUsers store
    socket.username = username;
    allUsers[username] = true;

    // inform user of success
    socket.emit(
      ServerConstants.SET_USERNAME_SUCCESS, {
        username: username,
        allUsers: allUsers
      }
    );

    // inform other users of a new user
    socket.broadcast.emit(
      ServerConstants.USER_CONNECT, {
        username: username
      }
    );
  });

  // user sends a message
  socket.on(ClientConstants.SEND_MESSAGE, function (message) {
    // inform other users of a new message
    socket.broadcast.emit(
      ServerConstants.USER_MESSAGE, {
        username: socket.username,
        message: message
      }
    );
  });

  // user types
  socket.on(ClientConstants.TYPING, function () {
    // inform other users of a user typing
    socket.broadcast.emit(
      ServerConstants.USER_TYPING, {
        username: socket.username
      }
    );
  });

  // user stops typing
  socket.on(ClientConstants.STOP_TYPING, function () {
    // inform other users a user stopped typing
    socket.broadcast.emit(
      ServerConstants.USER_STOP_TYPING, {
        username: socket.username
      }
    );
  });

  // user disconnects
  socket.on('disconnect', function () {
    // delete username if username is set and inform other users
    if (socket.username) {
      delete allUsers[socket.username];

      socket.broadcast.emit(
        ServerConstants.USER_DISCONNECT, {
          username: socket.username
        }
      );
    }
  });
}

module.exports = ChatSocketServerHandler;