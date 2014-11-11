var ServerActions = require('../actions/ServerActions'),
  Socket;

// naive check for node vs. browser
// to prevent errors when rendering React server-side
try {
  if(window !== undefined) {
    Socket = require('../socket');

    // if no username on connection
    Socket.on('no username', function() {
      ServerActions.resetApp();
    });

    // return login error
    Socket.on('login fail', function(data) {
      ServerActions.failLogin(data);
    });

    // return data with login name, list of users, number of users
    Socket.on('login success', function(data) {
      ServerActions.login(data);
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
  }
} catch(e) {}

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