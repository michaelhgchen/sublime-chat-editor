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
  }
}