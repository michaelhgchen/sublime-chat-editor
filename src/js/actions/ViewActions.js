var
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ActionTypes   = require('../constants/Constants').ActionTypes;

SocketHandler = {
  setUsername: function(){},
  sendMessage: function(){},
  type: function(){},
  stopTyping: function(){}
}

module.exports = {
  setUsername: function(username) {
    SocketHandler.setUsername(username);
  },

  sendMessage: function(message) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE,
      data: {
        message: message
      }
    });

    SocketHandler.sendMessage(message);
  },

  type: function() {
    SocketHandler.type();
  },

  stopTyping: function() {
    SocketHandler.stopTyping();
  },

  // set handler
  setSocketHandler: function(handler) {
    SocketHandler = handler;
  }
}