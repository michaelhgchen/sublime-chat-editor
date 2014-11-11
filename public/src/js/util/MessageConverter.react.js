var
  React   = require('react/addons'),
  TextMap = require('./TextMap.react');

module.exports = function(messages) {
  var convertedMessages = [];

  messages.forEach(function(message) {
    message = TextMap(message);

    if(message[0] === convertedMessages[convertedMessages.length - 1]) {
      convertedMessages.pop();
    }

    convertedMessages = convertedMessages.concat(message);
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