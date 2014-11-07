var
  React     = require('react'),
  ChatStore = require('../stores/ChatStore');
  // ChatName  = require('./ChatName.react'),
  // ChatInput = require('./ChatInput.react'),
  // ChatLog   = require('./ChatLog.react');

function getStateFromChatStores() {
  return {
    name: ChatStore.getName(),
    messages: ChatStore.getMessages(),
    users: ChatStore.getUsers()
  }
}

var ChatApp = React.createClass({
  getInitialState: function() {
    return getStateFromChatStores();
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
        <div className="chat-display">
          <ul className="message-list">
            <li>message</li>
            <li>message</li>
            <li>message</li>
            <li>message</li>
            <li>message</li>
          </ul>
          <ul className="user-list">
            <li>user</li>
            <li>user</li>
            <li>user</li>
            <li>user</li>
            <li>user</li>
          </ul>
        </div>
        <input type="text" className="chat-input"/>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromChatStores());
  }
});

module.exports = ChatApp;