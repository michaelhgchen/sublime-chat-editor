var
  AppDispatcher = require('../dispatcher/AppDispatcher');
  ActionTypes   = require('../constants/Constants').ActionTypes;

module.exports = {
  resetApp: function() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RESET_APP
    });
  },

  login: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN,
      data: data
    });
  },

  failLogin: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.FAIL_LOGIN,
      data: data
    });
  },

  joinUser: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_JOINED,
      data: data
    });
  },

  leaveUser: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_LEFT,
      data: data
    });
  },

  newMessage: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.NEW_MESSAGE,
      data: data
    });
  },

  typing: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.TYPING,
      data: data
    });
  },

  stopTyping: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.STOP_TYPING,
      data: data
    });
  }
}