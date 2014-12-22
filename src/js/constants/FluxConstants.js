var enumify = require('../utils/enumify');

var ActionTypes = enumify({
  LOGIN: null,
  FAIL_LOGIN: null,
  ADD_USER: null,
  REMOVE_USER: null,
  SEND_MESSAGE: null,
  RECEIVE_MESSAGE: null,
  ADD_TYPING_USER: null,
  REMOVE_TYPING_USER: null,
  RESET_MESSAGES: null,
  HIDE_MESSAGES: null,
  SHOW_MESSAGES: null,
  LOGOUT: null
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
  RECEIVE: null,
  CONTINUE: null,
  END: null,
  SERVER: null
});

var LanguageClasses = {
  VAR: "text-var",
  FUNCTION: "text-function",
  OPERATOR: "text-operator",
  STRING: "text-string",
  ARGUMENT: "text-argument",
  INDENT: "text-indent",
  RESERVED: "text-reserved",
  COMMENT: "text-comment",
  NUMBER: "text-entity"
};

module.exports = {
  ActionTypes: ActionTypes,
  PayloadSources: PayloadSources,
  MessageTypes: MessageTypes,
  LanguageClasses: LanguageClasses
}