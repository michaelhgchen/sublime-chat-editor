var enumify = require('../utils/enumify');

var ClientSocketEvents = enumify({
  SET_USERNAME: null,
  SEND_MESSAGE: null,
  TYPING: null,
  STOP_TYPING: null
});

var ServerSocketEvents = enumify({
  SET_USERNAME_FAIL: null,
  SET_USERNAME: null,
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