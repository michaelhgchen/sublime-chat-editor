var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var MessageList = require('./MessageList.react');
var Sidebar = require('./Sidebar.react');

var ChatTop = React.createClass({
  render: function() {
    return (
      <div className="chat-display">
        <Sidebar key="user-list" allUsers={this.props.allUsers} />
        <MessageList messages={this.props.messages} />
      </div>
    );
  }
});

module.exports = ChatTop;