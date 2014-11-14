var SocketEventsConstants = require('./constants/SocketEventsConstants');
var ClientSocketConstants = SocketEventsConstants.client;
var ServerSocketConstants = SocketEventsConstants.server;
var allUsers = {};

function ChatSocketServerHandler (socket) {
  var socketUsername;

  // user tries to set a username
  socket.on(ClientSocketConstants.SET_USERNAME, function (username) {
    // if name is already used emit error
    if(allUsers[username]) {
      socket.emit(
        ServerSocketConstants.SET_USERNAME_FAIL, {
          username: username,
          error: 'duplicate'
        }
      );

      return;
    }

    // otherwise set name in socket and allUsers store
    socketUsername = username;
    allUsers[username] = true;

    // inform user of success
    socket.emit(
      ServerSocketConstants.SET_USERNAME_SUCCESS, {
        username: username,
        allUsers: allUsers
      }
    );

    // inform other users of a new user
    socket.broadcast.emit(
      ServerSocketConstants.USER_CONNECT, {
        username: username
      }
    );
  });

  // user sends a message
  socket.on(ClientSocketConstants.SEND_MESSAGE, function (message) {
    // inform other users of a new message
    socket.broadcast.emit(
      ServerSocketConstants.USER_MESSAGE, {
        username: socketUsername,
        message: message
      }
    );
  });

  // user types
  socket.on(ClientSocketConstants.TYPING, function () {
    // inform other users of a user typing
    socket.broadcast.emit(
      ServerSocketConstants.USER_TYPING, {
        username: socketUsername
      }
    );
  });

  // user stops typing
  socket.on(ClientSocketConstants.STOP_TYPING, function () {
    // inform other users a user stopped typing
    socket.broadcast.emit(
      ServerSocketConstants.USER_STOP_TYPING, {
        username: socketUsername
      }
    );
  });

  // user disconnects
  socket.on('disconnect', function () {
    // delete username if username is set and inform other users
    if (socketUsername) {
      delete allUsers[socketUsername];

      socket.broadcast.emit(
        ServerSocketConstants.USER_DISCONNECT, {
          username: socketUsername
        }
      );
    }
  });
}

module.exports = ChatSocketServerHandler;