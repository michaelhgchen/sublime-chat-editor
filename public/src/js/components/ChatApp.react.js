var
  React       = require('react'),
  ChatStore   = require('../stores/ChatStore'),
  Login       = require('./Login.react'),
  MessageList = require('./MessageList.react'),
  UserList    = require('./UserList.react'),
  ChatBottom  = require('./ChatBottom.react.js');

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
    return (
      <div className="chat-app">
        {this.state.username ? '' : <Login/>}
        <div className="chat-display">
          <MessageList messages={this.state.messages} />
          <UserList allUsers={this.state.allUsers} />
        </div>
        <ChatBottom messages={this.state.messages} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = ChatApp;