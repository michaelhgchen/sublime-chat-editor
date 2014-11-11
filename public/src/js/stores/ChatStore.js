var
  assign        = require('object-assign'),
  EventEmitter  = require('events').EventEmitter,
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ActionTypes   = require('../constants/Constants').ActionTypes,
  TextTypes     = require('../constants/Constants').TextTypes,
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
  if(username) messages.push(message);
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
      addMessage({
        type: TextTypes.INIT,
        username: data.username
      });

      ChatStore.emitChange();
      break;

    case ActionTypes.USER_JOINED:
      addUser(action.data.username);
      addMessage({
        type: TextTypes.JOINED,
        username: action.data.username
      });
      ChatStore.emitChange();
      break;

    case ActionTypes.USER_LEFT:
      removeUser(action.data.username);
      addMessage({
        type: TextTypes.LEFT,
        username: action.data.username
      });
      ChatStore.emitChange();
      break;

    case ActionTypes.NEW_MESSAGE:
      data = action.data;

      addMessage({
        type: TextTypes.NEW_MESSAGE,
        username: data.username,
        message: data.message
      });
      ChatStore.emitChange();
      break;

    case ActionTypes.SEND_MESSAGE:
      data = action.data;

      addMessage({
        type: TextTypes.SEND_MESSAGE,
        username: username,
        message: data.message
      });
      ChatStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = ChatStore;