var
  React              = require('react/addons'),
  CSSTransitionGroup = require('react/addons').addons.CSSTransitionGroup,
  MessageList        = require('./MessageList.react'),
  UserList           = require('./UserList.react');

var ChatApp = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    var messages;

    return (
      <div className="chat-display">
        <CSSTransitionGroup transitionName="login-transition">
          {
            this.props.loggedIn
              ? <UserList key="user-list" allUsers={this.props.allUsers} />
              : null
          }
        </CSSTransitionGroup>
        <MessageList messages={this.props.messages} />
      </div>
    );
  },
});

module.exports = ChatApp;