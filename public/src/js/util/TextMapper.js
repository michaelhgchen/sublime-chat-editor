var
  TextTypes   = require('../constants/Constants').TextTypes;

module.exports = function(data, line) {
  switch(data.type) {
    case TextTypes.JOINED:
      return;
    case TextTypes.LEFT:
      return;
    case TextTypes.MESSAGE:
      return;
    case TextTypes.COMMENT:
      return;
  }
}