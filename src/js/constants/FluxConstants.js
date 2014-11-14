var enumify = require('../utils/enumify');

var ActionTypes: enumify({
  LOGIN: null,
  FAIL_LOGIN: null,
  USER_JOINED: null,
  NEW_MESSAGE: null,
  TYPING: null,
  STOP_TYPING: null,
  USER_LEFT: null,
  RESET_APP: null
});

var PayloadSources: enumify({
  SERVER_ACTION: null,
  VIEW_ACTION: null
});

module.exports = {
  ActionTypes: ActionTypes,
  PayloadSources: PayloadSources
}