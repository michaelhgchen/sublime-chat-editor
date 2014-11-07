var
  AppDispatcher = require('../dispatcher/AppDispatcher');
  ActionTypes   = require('../constants/Constants').ActionTypes;

module.exports = {
  loginSuccess: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_SUCCESS,
      data: data
    });
  },

  loginFail: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_FAIL,
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
  }
}