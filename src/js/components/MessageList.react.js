var React = require('react');
var MessageLine = require('./MessageLine.react');

MessageList = React.createClass({
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

      return <MessageLine key={line} line={line} message={message} />
    });

    return (
      <div className="message-list">
        <div className="message-list-header">
          <i className="left-arrow"></i>
          <i className="right-arrow"></i>
          <i className="pull-right down-arrow"></i>
        </div>
        {messages}
      </div>
    );
  },

  _shouldScrollBottom: false
});

module.exports = MessageList;