var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var UserStore = require('./stores/UserStore');
var MessageStore = require('./stores/MessageStore');
var Login = require('./components/Login.react');
  // ChatTop            = require('./ChatTop.react'),
  // ChatBottom         = require('./ChatBottom.react.js');

function getStateFromStores() {
  return {
    username: UserStore.getUsername(),
    allUsers: UserStore.getAllUsers(),
    messages: MessageStore.getMessages()
  }
}

var ChatApp = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var hasUsername = !!this.state.username.trim();

    return (
      <div className="chat-app">
        <CSSTransitionGroup transitionName="login-transition">
          { hasUsername ? null : <Login key="Login"/> }
        </CSSTransitionGroup>
      </div>
    );

    //   <ChatTop
    //     allUsers={this.state.allUsers}
    //     messages={this.state.messages}
    //     loggedIn={loggedIn} />

    //   <ChatBottom
    //     messages={this.state.messages}
    //     loggedIn={loggedIn} />
    // </div>
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = ChatApp;