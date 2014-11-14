var enumify = require('../utils/enumify');

var ActionTypes = enumify({
  SET_USERNAME: null,
  FAIL_SET_USERNAME: null,
  ADD_USER: null,
  REMOVE_USER: null,
  ADD_MESSAGE: null,
  ADD_TYPING_USER: null,
  REMOVE_TYPING_USER: null
});

var PayloadSources = enumify({
  SERVER_ACTION: null,
  VIEW_ACTION: null
});

var MessageTypes = enumify({
  JOIN: null,
  ADD_USER: null,
  REMOVE_USER: null,
  TYPING: null,
  SEND: null,
  RECEIVE: null
});

module.exports = {
  ActionTypes: ActionTypes,
  PayloadSources: PayloadSources,
  MessageTypes: MessageTypes
}