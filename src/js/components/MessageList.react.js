var React = require('react');
var TypingUserStore = require('../stores/TypingUserStore');
var MessageLine = require('./MessageLine.react');

function getStateFromStores() {
  return {
    typingUsers: TypingUserStore.getTypingUsers()
  }
}

MessageList = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TypingUserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TypingUserStore.removeChangeListener(this._onChange);
  },

  // thanks vjeux
  componentWillUpdate: function() {
    var node = this.getDOMNode();

    this._shouldScrollBottom =
      (node.scrollTop + node.offsetHeight) > node.scrollHeight;
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

    // var typingText = '';
    // var typingUsers = this.state.typingUsers;
    // var numTypingUsers = typingUsers.length;

    // if(numTypingUsers === 1) {
    //   typingText += typingUsers[0];
    //   typingText += ' is typing...';
    // } else if(numTypingUsers > 1) {
    //   typingText += typingUsers.join(', ');
    //   typingText += ' are typing...';
    // }

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

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  _shouldScrollBottom: false
});

module.exports = MessageList;