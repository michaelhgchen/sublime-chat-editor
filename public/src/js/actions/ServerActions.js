var
  AppDispatcher = require('../dispatcher/AppDispatcher');
  ActionTypes   = require('../constants/Constants').ActionTypes;

module.exports = {
  newMessage: function(message) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.NEW_MESSAGE,
      message: message
    });
  },

  newName: function(name) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.NEW_NAME,
      name: name
    });
  },

  userJoin: function(username) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_JOIN,
      username: username
    });
  },

  userLeave: function(username) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_LEAVE,
      username: username
    });
  },

  syncUsers: function(usernames) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SYNC_USERS,
      usernames: usernames
    });
  }
}