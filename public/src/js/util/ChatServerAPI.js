var
  Socket        = require('../socket'),
  ServerActions = require('../actions/ServerActions');

// return login error
Socket.on('login fail', function(data) {
  ServerActions.loginFail(data);
});

// return data with login name, list of users, number of users
Socket.on('login success', function(data) {
  ServerActions.loginSuccess(data);
});

Socket.on('user joined', function(data) {
  ServerActions.joinUser(data);
});

Socket.on('user left', function(data) {
  ServerActions.leaveUser(data);
});

Socket.on('new message', function(data) {
  ServerActions.newMessage(data);
});

Socket.on('typing', function(data) {
  ServerActions.typing(data);
});

Socket.on('stop typing', function(data) {
  ServerActions.stopTyping(data);
});

module.exports = {
  newUser: function(username) {
    Socket.emit('new user', username);
  },

  newMessage: function(message) {
    Socket.emit('new message', message);
  },

  typing: function() {
    Socket.emit('typing');
  },

  stopTyping: function() {
    Socket.emit('stop typing');
  }
}