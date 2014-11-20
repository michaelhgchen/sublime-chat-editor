var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var MessageList = require('./MessageList.react');
var Sidebar = require('./Sidebar.react');

var ChatTop = React.createClass({displayName: 'ChatTop',
  render: function() {
    return (
      React.createElement("div", {className: "chat-display"}, 
        React.createElement(CSSTransitionGroup, {transitionName: "login-transition"}, 
          
            this.props.loggedIn
              ? React.createElement(Sidebar, {key: "user-list", allUsers: this.props.allUsers})
              : null
          
        ), 
        React.createElement(MessageList, {messages: this.props.messages})
      )
    );
  }
});

module.exports = ChatTop;