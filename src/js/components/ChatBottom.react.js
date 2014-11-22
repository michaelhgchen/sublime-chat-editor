var React = require('react');
var ChatInput = require('./ChatInput.react');
var ChatStats = require('./ChatStats.react');

var ChatBottom = React.createClass({
  render: function() {
    return (
      <div className="chat-bottom">
        <ChatInput
          disabled={!this.props.loggedIn}
          label="File Name:"/>
        <ChatStats
          line={this.props.messages.length || 1}
          column={1}/>
      </div>
    );
  }
});

module.exports = ChatBottom;