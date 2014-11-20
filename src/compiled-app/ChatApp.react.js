var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var UserStore = require('./stores/UserStore');
var MessageStore = require('./stores/MessageStore');
var TypingUserStore = require('./stores/TypingUserStore');
var Login = require('./components/Login.react');
var ChatTop = require('./components/ChatTop.react');
var ChatBottom = require('./components/ChatBottom.react');

function getStateFromStores() {
  return {
    username: UserStore.getUsername(),
    allUsers: UserStore.getAllUsers(),
    messages: MessageStore.getMessages(),
    typingText: TypingUserStore.getTypingUsersText()
  }
}

var ChatApp = React.createClass({displayName: 'ChatApp',
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    TypingUserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
    TypingUserStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var loggedIn = !!this.state.username.trim();
    var messages = [];

    if(this.state.username) {
      messages = this.state.messages.slice(0);

      if(this.state.typingText) messages.push(this.state.typingText);
    }

    // add blinker
    messages.push('<span class="blinking">|</span>');

    return (
      React.createElement("div", {className: "chat-app"}, 
        React.createElement(CSSTransitionGroup, {transitionName: "login-transition"}, 
           loggedIn ? null : React.createElement(Login, {key: "Login"})
        ), 

        React.createElement(ChatTop, {
          allUsers: this.state.allUsers, 
          messages: messages, 
          loggedIn: loggedIn}), 

        React.createElement(ChatBottom, {
          allUsers: this.state.allUsers, 
          messages: messages, 
          loggedIn: loggedIn})
      )
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = ChatApp;