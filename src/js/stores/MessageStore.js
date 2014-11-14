var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var MessageUtil = require('../utils/MessageUtil');
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

var MessageStore = assign({}, EventEmitter.prototype, {
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

MessageStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action, convertedMessage;

  action = payload.action;

  switch(action.type) {
    case ActionTypes.SET_USERNAME:
      convertedMessage = MessageUtil.convertRawMessage(MessageTypes.JOIN);
      addMessage(convertedMessage);
      MessageStore.emitChange();
      break;

    case ActionTypes.ADD_USER:
      convertedMessage = MessageUtil.convertRawMessage(
        MessageTypes.ADD_USER,
        action.data.username
      );
      addMessage(convertedMessage);
      MessageStore.emitChange();
      break;

    case ActionTypes.REMOVE_USER:
      convertedMessage = MessageUtil.convertRawMessage(
        MessageTypes.REMOVE_USER,
        action.data.username
      );

      addMessage(convertedMessage);
      MessageStore.emitChange();
      break;

    case ActionTypes.ADD_MESSAGE:
      if(action.data.username) {
        convertedMessage = MessageUtil.convertRawMessage(
          MessageTypes.RECEIVE,
          action.data.username,
          action.data.message
        );
      } else {
        convertedMessage = MessageUtil.convertRawMessage(
          MessageTypes.SEND,
          null,
          action.data.message
        );
      }
      addMessage(convertedMessage);
      MessageStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = MessageStore;