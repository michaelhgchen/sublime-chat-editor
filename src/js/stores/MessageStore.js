var FluxFactory = require('../utils/FluxFactory');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var MessageUtil = require('../utils/MessageUtil');
var Constants = require('../constants/FluxConstants');
var ActionTypes = Constants.ActionTypes;
var MessageTypes = Constants.MessageTypes;

var messages = [];

// add initial messages
function initMessages() {
  var convertedMessage = MessageUtil.convertRawMessage(MessageTypes.JOIN);
  addMessages(convertedMessage.split('\n'));
}

function addMessage(message) {
  messages.push(message);
}

function addMessages(messages) {
  messages.forEach(addMessage);
}

function clearMessages() {
  messages = [];
}

function resetMessages() {
  clearMessages();
  initMessages();
}

var MessageStore = FluxFactory.createStore({
  getMessages: function() {
    return messages;
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action, convertedMessage;

    action = payload.action;

    switch(action.type) {
      case ActionTypes.SET_USERNAME:
        initMessages();
        MessageStore.emitChange();
        break;

      case ActionTypes.ADD_USER:
        convertedMessage = MessageUtil.convertRawMessage(
          MessageTypes.ADD_USER,
          action.data.username
        );
        addMessages(convertedMessage.split('\n'));
        MessageStore.emitChange();
        break;

      case ActionTypes.REMOVE_USER:
        convertedMessage = MessageUtil.convertRawMessage(
          MessageTypes.REMOVE_USER,
          action.data.username
        );

        addMessages(convertedMessage.split('\n'));
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

        addMessages(convertedMessage.split('\n'));

        MessageStore.emitChange();
        break;

      case ActionTypes.RESET_MESSAGES:
        resetMessages();
        MessageStore.emitChange();
        break;

      default:
        break;
    }
  })
});

module.exports = MessageStore;