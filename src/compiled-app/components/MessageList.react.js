var React = require('react');
var MessageLine = require('./MessageLine.react');

MessageList = React.createClass({displayName: 'MessageList',
  // thanks vjeux
  componentWillUpdate: function() {
    var node = this.getDOMNode();

    this._shouldScrollBottom =
      (node.scrollTop + node.offsetHeight) <= node.scrollHeight;
  },

  componentDidUpdate: function() {
    if(this._shouldScrollBottom) {
      var node = this.getDOMNode();

      node.scrollTop = node.scrollHeight
    }
  },

  render: function() {
    var messages = this.props.messages.map(function(message, i) {
      var line = i + 1;

      return React.createElement(MessageLine, {key: line, line: line, message: message})
    });

    return (
      React.createElement("div", {className: "message-list"}, 
        React.createElement("div", {className: "message-list-header"}, 
          React.createElement("i", {className: "left-arrow"}), 
          React.createElement("i", {className: "right-arrow"}), 
          React.createElement("i", {className: "pull-right down-arrow"})
        ), 
        messages
      )
    );
  },

  _shouldScrollBottom: false
});

module.exports = MessageList;