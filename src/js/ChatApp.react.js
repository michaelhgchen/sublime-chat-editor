var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var UserStore = require('./stores/UserStore');
var MessageStore = require('./stores/MessageStore');
var Login = require('./components/Login.react');
var ChatTop = require('./components/ChatTop.react');
var ChatBottom = require('./components/ChatBottom.react');
var assign = require('object-assign');

function getUserStateFromStores() {
  return {
    username: UserStore.getUsername(),
    allUsers: UserStore.getAllUsers()
  };
}

function getMessageStateFromStores() {
  return {
    messages: MessageStore.getMessages()
  };
}

var ChatApp = React.createClass({
  getInitialState: function() {
    var initialState = assign(
      getUserStateFromStores(),
      getMessageStateFromStores()
    );

    return initialState;
  },

  setTitle: function(text) {
    this.titleElem.text = text;
  },

  getTitle: function() {
    return this.titleElem.text;
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(this.state.unread) {
      if(!prevState.unread) {
        this.setTitle('*' + this.getTitle());
      }
    } else {
      if(prevState.unread) {
        this.setTitle(this.getTitle().slice(1));
      }
    }
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onMessageChange);
    UserStore.addChangeListener(this._onUserChange);

    this.titleElem = document.getElementsByTagName('title')[0];

    // HTML5 page visibility API
    // If set to visible, set unread to false
    document.addEventListener('visibilitychange', function() {
      if(!document.hidden) this.setState({ unread: false });
    }.bind(this));
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);

    document.removeEventListener('visibilitychange');
  },

  render: function() {
    var loggedIn = !!this.state.username.trim();
    var messages = this.state.messages.slice(0);

    // add blinker
    messages.push('<span class="blinking">|</span>');

    return (
      <div className="chat-app">
        <CSSTransitionGroup transitionName="login-transition">
          { loggedIn ? null : <Login key="Login"/> }
        </CSSTransitionGroup>

        <ChatTop
          allUsers={this.state.allUsers}
          messages={messages}
          loggedIn={loggedIn} />

        <ChatBottom
          allUsers={this.state.allUsers}
          messages={messages}
          loggedIn={loggedIn} />
      </div>
    );
  },

  _onMessageChange: function() {
    this.setState(assign(
      getMessageStateFromStores(),
      { unread: document.hidden }
    ));
  },

  _onUserChange: function() {
    this.setState(getUserStateFromStores());
  }
});

module.exports = ChatApp;