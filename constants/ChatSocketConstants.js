var enumify = require('../utils/enumify');

var ChatSocketConstants = {
  // events sent from client to server
  client: enumify({
    SET_USERNAME: null,
    SEND_MESSAGE: null,
    TYPING: null,
    STOP_TYPING: null
  }),

  // events sent from server to client
  server: enumify({
    SET_USERNAME_FAIL: null,
    SET_USERNAME_SUCCESS: null,
    USER_CONNECT: null,
    USER_DISCONNECT: null,
    USER_MESSAGE: null,
    USER_TYPING: null
    USER_STOP_TYPING: null
  })
};

module.exports = ChatSocketConstants;