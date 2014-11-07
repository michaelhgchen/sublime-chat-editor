var
  React       = require('react'),
  ViewActions = require('../actions/ViewActions'),
  ENTER_KEY   = 13,
  ChatInput;

ChatInput = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    }
  },

  handleSubmit: function() {
    if(this.state.message) {
      ViewActions.newMessage(this.state.message);

      this.setState({
        message: ''
      });
    }
  },

  handleChange: function(e) {
    this.setState({
      message: e.target.value
    });
  },

  handleEnter: function(e) {
    if(e.keyCode === ENTER_KEY) {
      this.handleSubmit();
    }
  },

  render: function() {
    return (
      <input
        className="chat-input"
        type="text"
        value={this.state.message}
        ref="chatInput"
        onChange={this.handleChange}
        onKeyDown={this.handleEnter}
        onSubmit={this.handleSubmit}/>
    );
  }
});

module.exports = ChatInput;