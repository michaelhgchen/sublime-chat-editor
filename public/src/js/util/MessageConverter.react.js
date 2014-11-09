var
  TextMap = require('./TextMap.react');

module.exports = function(messages) {
  var convertedMessages = [], messageCount;

  messages.forEach(function(message) {
    message = TextMap(message);

    convertedMessages.push(message);
  });

  convertedMessages = convertedMessages.map(function(message, line) {
    line = line + 1; // 0 indexed

    return (
      <div className="line">
        <div className="line-number">{line}</div>
        <div className="line-message">
          {message}
        </div>
      </div>
    );
  });

  messageCount = convertedMessages.length;

  convertedMessages.push(
    <div className="line">
      <div className="line-number">{messageCount + 1}</div>
      <div className="line-message"><span className="blinking">|</span></div>
    </div>
  );

  return convertedMessages;
}