var FluxFactory = require('../utils/FluxFactory');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var MessageUtil = require('../utils/MessageUtil');
var Constants = require('../constants/FluxConstants');
var ActionTypes = Constants.ActionTypes;
var MessageTypes = Constants.MessageTypes;


var currentUser = '';
var previousSender;
var initialMessages = MessageUtil.convertRawMessage(MessageTypes.JOIN);
var messages = [];
var loggedIn = false;
var isHiding = false;

// add initial messages
function initMessages() {
  addMessageString(initialMessages);
}

function clearMessages() {
  messages = [];
}

function resetMessages() {
  clearMessages();
  initMessages();
}

function addMessage(message) {
  messages.push(message);
}

function addMessages(messages) {
  messages.forEach(addMessage);
}

function addMessageString(message) {
  addMessages(message.split('\n'));
}

function hideMessages() {
  isHiding = true;
}

function showMessages() {
  isHiding = false;
}

function isPreviousSender(username) {
  return previousSender === username;
}

function setPreviousSender(username) {
  previousSender = username;
}

var MessageStore = FluxFactory.createStore({
  getMessages: function() {
    return isHiding ? initialMessages : messages;
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action, messageType;

    action = payload.action;

    if(loggedIn) {
      switch(action.type) {
        case ActionTypes.LOGOUT:
          loggedIn = false;
          currentUser = '';
          resetMessages();
          MessageStore.emitChange();
          break;
        case ActionTypes.RESET_MESSAGES:
          resetMessages();
          MessageStore.emitChange();
          break;
        case ActionTypes.ADD_USER:
          addMessageString(
            MessageUtil.convertRawMessage(
              MessageTypes.ADD_USER, {
                username: action.data.username
              }
            )
          );
          MessageStore.emitChange();
          break;
        case ActionTypes.REMOVE_USER:
          addMessageString(
            MessageUtil.convertRawMessage(
              MessageTypes.REMOVE_USER, {
                username: action.data.username
              }
            )
          );
          MessageStore.emitChange();
          break;
        case ActionTypes.SEND_MESSAGE:
          messageType = MessageTypes.CONTINUE;

          if(!isPreviousSender(currentUser)) {
            messageType = MessageTypes.SEND;
            setPreviousSender(currentUser);
          }

          addMessageString(
            MessageUtil.convertRawMessage(
              messageType, {
                username: currentUser,
                message: action.data.message
              }
            )
          );

          MessageStore.emitChange();
          break;
        case ActionTypes.RECEIVE_MESSAGE:
          messageType = MessageTypes.CONTINUE;

          if(!isPreviousSender(action.data.username)) {
          //   if(previousSender) {
          //     addMessageString(
          //       MessageUtil.convertRawMessage(
          //         MessageTypes.END
          //       )
          //     );
          //   }
            messageType = MessageTypes.RECEIVE;
            setPreviousSender(action.data.username);
          }

          addMessageString(
            MessageUtil.convertRawMessage(
              messageType, {
                username: action.data.username,
                message: action.data.message
              }
            )
          );
          MessageStore.emitChange();
          break;
        case ActionTypes.HIDE_MESSAGES:
          hideMessages();
          MessageStore.emitChange();
          break;
        case ActionTypes.SHOW_MESSAGES:
          showMessages();
          MessageStore.emitChange();
          break;
        default:
          break;
      }
    } else {
      switch(action.type) {
        case ActionTypes.LOGIN:
          loggedIn = true;
          currentUser = action.data.username;
          resetMessages();
          MessageStore.emitChange();
          break;

        default:
          break;
      }
    }
  })
});

module.exports = MessageStore;