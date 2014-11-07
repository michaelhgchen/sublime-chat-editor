var
  React = require('react'),
  TypingStore = require('../stores/TypingStore'),
  MessageList;

function getStateFromStores() {
  return {
    typingUsers: TypingStore.getTypingUsers()
  }
}

MessageList = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TypingStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TypingStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var messages, typingUsers, typingUsersNum, typingUsersMessage;

    messages = this.props.messages.map(function(data){
      return (
        <li>{data.author ? data.author + ': ' : ''}{data.message}</li>
      );
    });

    typingUsers = Object.keys(this.state.typingUsers);
    typingUsersNum = typingUsers.length;

    if(typingUsersNum) {
      if(typingUsersNum === 1) {
        typingUsersMessage = <li>{typingUsers[0]} is typing...</li>;
      } else if (typingUsersNum < 4) {
        typingUsersMessage = (<li>
          {typingUsers.slice(0, 2).join(', ')} and {typingUsers[2]} are typing...
        </li>);
      } else {
        typingUsersMessage = (<li>
          {typingUsers.slice(0, 2).join(', ')} and {typingUsersNum - 2} other users are typing...
        </li>);
      }
    }

    return (
      <ul className="message-list">
        <li><b>messages</b></li>
        {messages}
        {typingUsersMessage}
      </ul>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = MessageList;