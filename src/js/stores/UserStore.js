var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/FluxConstants').ActionTypes;
var CHANGE_EVENT = 'change';

var username = '';
var allUsers = {};

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

var UserStore = assign({}, EventEmitter.prototype, {
  getUsername: function() {
    return username;
  },

  getAllUsers: function() {
    return allUsers;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

UserStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action;

  action = payload.action;

  switch(action.type) {
    case ActionTypes.SET_USERNAME:
      data = action.data;

      setUsername(data.username);
      addAllUsers(data.allUsers);
      UserStore.emitChange();
      break;

    case ActionTypes.FAIL_SET_USERNAME:
      UserStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = UserStore;