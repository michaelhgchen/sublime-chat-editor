var
  assign        = require('object-assign'),
  EventEmitter  = require('events').EventEmitter,
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ActionTypes   = require('../constants/Constants').ActionTypes,
  CHANGE_EVENT  = 'change',
  messages, usernames, name, ChatStore;

name      = '';
usernames = {};
messages  = [];

ChatStore = assign({}, EventEmitter.prototype, {
  getName: function() {
    return name;
  },

  getUsers: function() {
    return usernames;
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
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.NEW_MESSAGE:
      messages.push(action.message);
      ChatStore.emitChange();
      break;

    case ActionTypes.NEW_NAME:
      name = action.name;
      ChatStore.emitChange();
      break;

    case ActionTypes.USER_JOIN:
      usernames[action.username] = action.username;
      ChatStore.emitChange();
      break;

    case ActionTypes.USER_LEAVE:
      delete usernames[action.username];
      ChatStore.emitChange();
      break;

    case ActionTypes.GET_USERS:
      usernames = action.usernames;
      break;

    default:
      break;
  }
});

module.exports = ChatStore;