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

module.exports = {
  newUser: function(username) {
    Socket.emit('new user', username);
  }
}