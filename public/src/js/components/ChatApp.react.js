var
  React     = require('react'),
  ChatStore = require('../stores/ChatStore'),
  Login     = require('./Login.react');

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
    var Body, messages, allUsers;

    if(this.state.username) {
      messages = this.state.messages.map(function(data){
        return (
          <li>{data.author ? data.author + ': ' : ''}{data.message}</li>
        );
      });

      allUsers = Object.keys(this.state.allUsers).map(function(user) {
        return (
          <li>{user}</li>
        );
      });

      Body = (
      <div className="chat-app">
        <div className="chat-display">
          <ul className="message-list">
            {messages}
          </ul>
          <ul className="user-list">
            {allUsers}
          </ul>
        </div>
        <input type="text" className="chat-input"/>
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