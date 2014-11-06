var
  React = require('react'),
  ChatLog;

ChatLog = React.createClass({
  render: function() {
    var messages = this.props.messages;

    messages = messages.map(function(message) {
      return (
        <li>{message.author}: {message.message}</li>
      );
    });

    return (
      <ul>
        {messages}
      </ul>
    );
  }
});

module.exports = ChatLog;