var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/FluxConstants').ActionTypes;

module.exports = {
  logout: function() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGOUT
    });
  },

  login: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN,
      data: data
    });
  },

  failSetUsername: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.FAIL_LOGIN,
      data: data
    });
  },

  addAllUsers: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ADD_ALL_USERS,
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

  receiveMessage: function(data) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MESSAGE,
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