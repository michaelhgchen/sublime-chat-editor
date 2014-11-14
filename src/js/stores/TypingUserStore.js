var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/FluxConstants').ActionTypes;
var CHANGE_EVENT = 'change';

var typingUsers = {};

function addTypingUser(username) {
  typingUsers[username] = username;
}

function removeTypingUser(username) {
  delete typingUsers[username];
}

TypingUserStore = assign({}, EventEmitter.prototype, {
  getTypingUsers: function() {
    return Object.keys(typingUsers);
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

TypingUserStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action;

  action = payload.action;

  switch(action.type) {
    case ActionTypes.ADD_MESSAGE:
      removeTypingUser(action.data.username);
      TypingUserStore.emitChange();
      break;

    case ActionTypes.ADD_TYPING_USER:
      addTypingUser(action.data.username);
      TypingUserStore.emitChange();
      break;

    case ActionTypes.REMOVE_TYPING_USER:
      removeTypingUser(action.data.username);
      TypingUserStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = TypingUserStore;