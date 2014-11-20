var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/FluxConstants').ActionTypes;

module.exports = {
  setUsername: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SET_USERNAME,
      data: data
    });
  },

  failSetUsername: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.FAIL_SET_USERNAME,
      data: data
    });
  },

  addUser: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ADD_USER,
      data: data
    });
  },

  removeUser: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REMOVE_USER,
      data: data
    });
  },

  addMessage: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ADD_MESSAGE,
      data: data
    });
  },

  addTypingUser: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ADD_TYPING_USER,
      data: data
    });
  },

  removeTypingUser: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REMOVE_TYPING_USER,
      data: data
    });
  }
}