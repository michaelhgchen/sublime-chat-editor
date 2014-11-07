var
  React       = require('react'),
  ChatStore   = require('../stores/ChatStore'),
  Login       = require('./Login.react'),
  MessageList = require('./MessageList.react'),
  UserList    = require('./UserList.react'),
  ChatInput   = require('./ChatInput.react.js');

function getStateFromStores() {
  return {
    username: ChatStore.getUsername(),
    allUsers: ChatStore.getAllUsers(),
    messages: ChatStore.getMessages()
  }
}

var ChatApp = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    ChatStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ChatStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var Body;

    if(this.state.username) {
      Body = (
      <div className="chat-app">
        <div className="chat-display">
          <MessageList messages={this.state.messages} />
          <UserList allUsers={this.state.allUsers} />
        </div>

        <ChatInput />
      </div>
      );
    } else {
      Body = <Login/>;
    }

    return Body;
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = ChatApp;