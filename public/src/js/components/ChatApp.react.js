var
  React              = require('react'),
  CSSTransitionGroup = require('react/addons').addons.CSSTransitionGroup,
  ChatStore          = require('../stores/ChatStore'),
  Login              = require('./Login.react'),
  MessageList        = require('./MessageList.react'),
  UserList           = require('./UserList.react'),
  ChatBottom         = require('./ChatBottom.react.js');

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
    var loggedIn, messages;

    loggedIn = !!this.state.username.trim();

    return (
      <div key="chat-app" className="chat-app">
        <div className="chat-display">
          <CSSTransitionGroup transitionName="login-transition">
            {
              loggedIn
                ? <UserList key="user-list" allUsers={this.state.allUsers} />
                : <Login key="log-in"/>
            }
          </CSSTransitionGroup>
          <MessageList messages={this.state.messages} />
        </div>
        <ChatBottom loggedIn={loggedIn} messages={this.state.messages} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = ChatApp;