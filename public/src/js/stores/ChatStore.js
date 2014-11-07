var
  assign        = require('object-assign'),
  EventEmitter  = require('events').EventEmitter,
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ActionTypes   = require('../constants/Constants').ActionTypes,
  CHANGE_EVENT  = 'change',
  loginStatus, username, allUsers, messages, ChatStore;

username    = '';
allUsers    = {};
messages    = [];

function setUsername(name) {
  username = name;
}

function addUser(user) {
  allUsers[user] = user;
}

function addAllUsers(users) {
  allUsers = users;
}

function removeUser(user) {
  delete allUsers[user];
}

function addMessage(message) {
  messages.push(message);
}

ChatStore = assign({}, EventEmitter.prototype, {
  getUsername: function() {
    return username;
  },

  getAllUsers: function() {
    return allUsers;
  },

  getMessages: function() {
    return messages;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

ChatStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action, data;

  action = payload.action;

  switch(action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      data = action.data;

      setUsername(data.username);
      addAllUsers(data.allUsers);
      ChatStore.emitChange();
      break;

    case ActionTypes.USER_JOINED:
      addUser(action.data.username);
      addMessage({ message: action.data.username + ' has joined' });
      ChatStore.emitChange();
      break;

    case ActionTypes.USER_LEFT:
      removeUser(action.data.username);
      addMessage({ message: action.data.username + ' has left'});
      ChatStore.emitChange();
      break;

    case ActionTypes.NEW_MESSAGE:
      data = action.data;

      addMessage({
        author: data.username,
        message: data.message
      });
      ChatStore.emitChange();
      break;

    case ActionTypes.SEND_MESSAGE:
      data = action.data;

      addMessage({
        author: username,
        message: data.message
      });
      ChatStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = ChatStore;