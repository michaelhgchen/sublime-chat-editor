var
  TextMap = require('./TextMap.react');

module.exports = function(messages) {
  var convertedMessages = [];

  messages.forEach(function(message) {
    message = TextMap(message);

    convertedMessages = convertedMessages.concat(message);
  });

  // add blinking cursor to last line
  convertedMessages.push(<span className="blinking">|</span>)

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