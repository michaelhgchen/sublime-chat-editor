var
  assign        = require('object-assign'),
  EventEmitter  = require('events').EventEmitter,
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ActionTypes   = require('../constants/Constants').ActionTypes,
  CHANGE_EVENT  = 'change',
  Store;

Store = assign({}, EventEmitter.prototype, {
  getMessage: function() {
    return 'Hello world!';
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

Store.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.LOG_CLIENT:
      Store.emitChange();
      break;

    case ActionTypes.LOG_SERVER:
      Store.emitChange();
      break;

    default:
      break;
  }
});

module.exports = Store;