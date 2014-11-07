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
    case ActionTypes.LOGIN_FAIL:
      ChatStore.emitChange();
      break;

    case ActionTypes.LOGIN_SUCCESS:
      data     = action.data;
      username = data.username;
      allUsers = data.allUsers;

      ChatStore.emitChange();
      break;

    case ActionTypes.USER_JOINED:
      data     = action.data;
      allUsers = data.allUsers;

      messages.push({
        author: null,
        message: data.username + ' has joined'
      });
      
      ChatStore.emitChange();
      break;

    case ActionTypes.USER_LEFT:
      data     = action.data;
      allUsers = data.allUsers;

      messages.push({
        author: null,
        message: data.username + ' has left'
      });

      ChatStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = ChatStore;