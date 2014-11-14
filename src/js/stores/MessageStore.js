var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/FluxConstants');
var ActionTypes = Constants.ActionTypes;
var MessageTypes = Constants.MessageTypes;
var CHANGE_EVENT = 'change';

var messages = [];

function addMessage(message) {
  messages.push(message);
}

function clearMessages() {
  messages = [];
}

var ChatStore = assign({}, EventEmitter.prototype, {
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
    case ActionTypes.SET_USERNAME:
      addMessage({ type: MessageTypes.JOIN });
      ChatStore.emitChange();
      break;

    case ActionTypes.ADD_USER:
      addMessage({
        type: MessageTypes.ADD_USER,
        username: action.data.username
      });
      ChatStore.emitChange();
      break;

    case ActionTypes.REMOVE_USER:
      addMessage({
        type: MessageTypes.REMOVE_USER,
        username: action.data.username
      });
      ChatStore.emitChange();
      break;

    case ActionTypes.ADD_MESSAGE:
      data = action.data;

      data.username
        ? addMessage({
          type: TextTypes.RECEIVE,
          username: data.username,
          message: data.message
        })
        : addMessage({
          type: TextTypes.SEND,
          message: data.message
        });
      ChatStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = ChatStore;