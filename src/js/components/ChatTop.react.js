var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var MessageList = require('./MessageList.react');
var Sidebar = require('./Sidebar.react');

var ChatTop = React.createClass({
  render: function() {
    return (
      <div className="chat-display">
        <CSSTransitionGroup transitionName="login-transition">
          {
            this.props.loggedIn
              ? <Sidebar key="user-list" allUsers={this.props.allUsers} />
              : null
          }
        </CSSTransitionGroup>
        <MessageList messages={this.props.messages} />
      </div>
    );
  }
});

module.exports = ChatTop;