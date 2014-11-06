var
  assign         = require('object-assign'),
  Dispatcher     = require('flux').Dispatcher,
  PayloadSources = require('../constants/Constants').PayloadSources,
  AppDispatcher;

AppDispatcher = assign(new Dispatcher(), {
  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };

    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };

    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;