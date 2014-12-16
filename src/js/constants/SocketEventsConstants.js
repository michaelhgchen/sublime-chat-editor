var enumify = require('../utils/enumify');

var ClientSocketEvents = enumify({
  LOGIN: null,
  SEND_MESSAGE: null,
  TYPING: null,
  STOP_TYPING: null
});

var ServerSocketEvents = enumify({
  LOGIN_SUCCESS: null,
  LOGIN_FAIL: null,
  USER_CONNECT: null,
  USER_DISCONNECT: null,
  USER_MESSAGE: null,
  USER_TYPING: null,
  USER_STOP_TYPING: null
});

module.exports = {
  Client: ClientSocketEvents,
  Server: ServerSocketEvents
}