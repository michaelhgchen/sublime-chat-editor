// get rid of some boilerplate
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var StoreDefaults = {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }
};

var FluxFactory = {
  createStore: function(options) {
    return assign({}, EventEmitter.prototype, StoreDefaults, options);
  }
}

module.exports = FluxFactory;