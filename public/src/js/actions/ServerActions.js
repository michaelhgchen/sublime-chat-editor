var
  AppDispatcher = require('../dispatcher/AppDispatcher');
  ActionTypes   = require('../contants/Constants').ActionTypes;

module.exports = {
  log: function(message) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOG_SERVER,
      message: message
    });
  }
}