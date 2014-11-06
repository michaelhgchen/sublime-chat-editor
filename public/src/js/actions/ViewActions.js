var
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ActionTypes   = require('../constants/Constants').ActionTypes,
  ChatServerAPI = require('../util/ChatServerAPI');

module.exports = {
  sendMessage: function(message) {
    ChatServerAPI.sendMessage(message);
  }
}