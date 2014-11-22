var FluxFactory = require('../utils/FluxFactory');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/FluxConstants').ActionTypes;

var username = '';
var allUsers = {};
var userError = false;

function setUsername(name) {
  username = name;
}

function addUser(user) {
  allUsers[user] = user;
}

function addAllUsers(users) {
  allUsers = users;
}

function removeUser(user) {
  delete allUsers[user];
}

var UserStore = FluxFactory.createStore({
  getUserError: function() {
    return userError;
  },

  getUsername: function() {
    return username;
  },

  getAllUsers: function() {
    return allUsers;
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action;

    action = payload.action;

    switch(action.type) {
      case ActionTypes.SET_USERNAME:
        userError = false;
        data = action.data;

        setUsername(data.username);
        addAllUsers(data.allUsers);
        UserStore.emitChange();
        break;

      case ActionTypes.FAIL_SET_USERNAME:
        userError = true;
        UserStore.emitChange();
        break;

      case ActionTypes.ADD_USER:
        addUser(action.data.username);
        UserStore.emitChange();
        break;

      case ActionTypes.REMOVE_USER:
        removeUser(action.data.username);
        UserStore.emitChange();
        break;

      default:
        break;
    }
  })
});

module.exports = UserStore;