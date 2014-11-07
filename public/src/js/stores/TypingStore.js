var
  assign        = require('object-assign'),
  EventEmitter  = require('events').EventEmitter,
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ActionTypes   = require('../constants/Constants').ActionTypes,
  CHANGE_EVENT  = 'change',
  typingUsers, TypingStore;

typingUsers = {};

function addTypingUser(username) {
  typingUsers[username] = username;
}

function removeTypingUser(username) {
  delete typingUsers[username];
}

TypingStore = assign({}, EventEmitter.prototype, {
  getTypingUsers: function() {
    return typingUsers;
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

TypingStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action;

  action = payload.action;

  switch(action.type) {
    case ActionTypes.NEW_MESSAGE:
      removeTypingUser(action.data.username);
      TypingStore.emitChange();
      break;

    case ActionTypes.TYPING:
      addTypingUser(action.data.username);
      TypingStore.emitChange();
      break;

    case ActionTypes.STOP_TYPING:
      removeTypingUser(action.data.username);
      TypingStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = TypingStore;