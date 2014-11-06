var
  AppDispatcher = require('../dispatcher/AppDispatcher');
  ActionTypes   = require('../constants/Constants').ActionTypes;

module.exports = {
  receiveMessage: function(messageData) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MESSAGE,
      messageData: messageData
    });
  }
}