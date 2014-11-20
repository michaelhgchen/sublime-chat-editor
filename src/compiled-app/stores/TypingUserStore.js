var assign = require('object-assign');
var MessageUtil = require('../utils/MessageUtil');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/FluxConstants');
var ActionTypes = Constants.ActionTypes;
var MessageTypes = Constants.MessageTypes;
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

  getTypingUsersText: function() {
    var typingText = '';
    var typingUsers = this.getTypingUsers();
    var numTypingUsers = typingUsers.length;

    if(!numTypingUsers) return '';

    if(numTypingUsers === 1) {
      typingText += typingUsers[0];
      typingText += ' is typing...';
    } else if(numTypingUsers > 1) {
      typingText += typingUsers.join(', ');
      typingText += ' are typing...';
    }

    return MessageUtil.convertRawMessage(MessageTypes.TYPING, '', typingText);
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