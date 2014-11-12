var
  React     = require('react/addons'),
  TextMap   = require('./TextMap.react'),
  TextTypes = require('../constants/Constants').TextTypes;

module.exports = function(messages) {
  var convertedMessages, previousType;

  convertedMessages = [];

  messages.forEach(function(message) {
    var type = message.type;

    if(previousType
      && previousType !== type
      && type !== TextTypes.TYPING
      && (previousType === TextTypes.SEND_MESSAGE
        || previousType === TextTypes.NEW_MESSAGE)) {
      convertedMessages.push('')
    }

    previousType = type;

    message = TextMap(message);

    convertedMessages = convertedMessages.concat(message);

    if(type !== TextTypes.SEND_MESSAGE
      && type !== TextTypes.NEW_MESSAGE
      && type !== TextTypes.TYPING) {
      convertedMessages.push('');
    }
  });

  // add blinking cursor to last line
  convertedMessages.push(<span className="blinking">|</span>)

  // each line is a react span
  convertedMessages = convertedMessages.map(function(message, line) {
    line = line + 1; // 0 indexed

    return (
      <div key={line} className="line">
        <div className="line-number">{line}</div>
        <div className="line-message">
          {message}
        </div>
      </div>
    );
  });

  return convertedMessages;
}