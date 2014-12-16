var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/FluxConstants').ActionTypes;

SocketHandler = {
  // login: function(){},
  // sendMessage: function(){},
  // type: function(){},
  // stopTyping: function(){}
};

module.exports = {
  setSocketHandler: function(handler) { SocketHandler = handler; },

  login: function(username) { SocketHandler.login(username); },

  sendMessage: function(message) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ADD_MESSAGE,
      data: { message: message }
    });

    SocketHandler.sendMessage(message);
  },

  type: function() { SocketHandler.type(); },

  stopTyping: function() { SocketHandler.stopTyping(); },

  resetMessages: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RESET_MESSAGES
    });
  },

  hideMessages: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.HIDE_MESSAGES
    });
  },

  showMessages: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SHOW_MESSAGES
    });
  }
}