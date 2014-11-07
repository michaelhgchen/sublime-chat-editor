var
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ActionTypes   = require('../constants/Constants').ActionTypes,
  ChatServerAPI = require('../util/ChatServerAPI');

module.exports = {
  newUser: function(username) {
    ChatServerAPI.newUser(username);
  },

  newMessage: function(message) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE,
      data: {
        message: message
      }
    });

    ChatServerAPI.newMessage(message);
  }
}