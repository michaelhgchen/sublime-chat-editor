var React = require('react');
var ViewActions = require('../actions/ViewActions');
var ENTER_KEY = 13;

var ChatInput = React.createClass({displayName: 'ChatInput',
  getInitialState: function() {
    return {
      message:''
    }
  },

  handleChange: function(e) {
    var self = this;

    if(!self._typeTimeout) {
      ViewActions.type();
    } else {
      clearTimeout(self._typeTimeout);
    }

    self._typeTimeout = setTimeout(function() {
      ViewActions.stopTyping();
      self._typeTimeout = null;
    }, 200);

    self.setState({
      message: e.target.value
    });
  },

  handleSubmit: function() {
    var message = this.state.message.trim();
    if(message) {
      if(message === '/clear') {
        ViewActions.resetMessages();
      } else {
        ViewActions.sendMessage(message);
        this.setState({ message: '' });
      }
    }
  },

  handleEnter: function(e) {
    if(e.keyCode === ENTER_KEY) this.handleSubmit();
  },

  render: function() {
    return (
      React.createElement("div", {className: "chat-input-container"}, 
        React.createElement("div", {className: "chat-input-label"}, this.props.label), 
        React.createElement("div", {className: "chat-input"}, 
          React.createElement("input", {
            disabled: this.props.disabled, 
            className: "input", 
            type: "text", 
            value: this.state.message, 
            onChange: this.handleChange, 
            onKeyDown: this.handleEnter, 
            onSubmit: this.handleSubmit})
        )
      )
    )
  },

  _typeTimeout: null
});

module.exports = ChatInput;
