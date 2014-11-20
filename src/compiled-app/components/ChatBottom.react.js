var React = require('react');
var ChatInput = require('./ChatInput.react');
var ChatStats = require('./ChatStats.react');

var ChatBottom = React.createClass({displayName: 'ChatBottom',
  render: function() {
    return (
      React.createElement("div", {className: "chat-bottom"}, 
        React.createElement(ChatInput, {disabled: !this.props.loggedIn, label: "File Name:"}), 
        React.createElement(ChatStats, {
          line: this.props.messages.length || 1, 
          column: 1})
      )
    );
  }
});

module.exports = ChatBottom;