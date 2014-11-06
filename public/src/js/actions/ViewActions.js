var
  AppDispatcher = require('../dispatcher/AppDispatcher');
  ActionTypes   = require('../contants/Constants').ActionTypes;

module.exports = {
  log: function(message) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOG_CLIENT,
      message: message
    });
  }
}