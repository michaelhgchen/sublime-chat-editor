var
  assign        = require('object-assign'),
  EventEmitter  = require('events').EventEmitter,
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ActionTypes   = require('../constants/Constants').ActionTypes,
  CHANGE_EVENT  = 'change',
  loginError, LoginStore;

loginError = '';

function setLoginError(error) {
  loginError = error;
}

function clearLoginError() {
  loginError = '';
}

LoginStore = assign({}, EventEmitter.prototype, {
  getLoginError: function() {
    return loginError;
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

LoginStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action;

  action = payload.action;

  switch(action.type) {
    case ActionTypes.LOGIN_FAIL:
      setLoginError(action.data.error);
      LoginStore.emitChange();
      break;

    case ActionTypes.LOGIN_SUCCESS:
      clearLoginError();
      LoginStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = LoginStore;