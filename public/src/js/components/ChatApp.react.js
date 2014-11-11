var
  React              = require('react/addons'),
  CSSTransitionGroup = require('react/addons').addons.CSSTransitionGroup,
  ChatStore          = require('../stores/ChatStore'),
  Login              = require('./Login.react'),
  ChatTop            = require('./ChatTop.react'),
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
        <CSSTransitionGroup transitionName="login-transition">
          { loggedIn ? null : <Login key="log-in"/> }
        </CSSTransitionGroup>

        <ChatTop
          allUsers={this.state.allUsers}
          messages={this.state.messages}
          loggedIn={loggedIn} />

        <ChatBottom
          messages={this.state.messages}
          loggedIn={loggedIn} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = ChatApp;