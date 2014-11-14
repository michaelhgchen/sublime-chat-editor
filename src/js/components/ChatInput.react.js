var React = require('react');
var ViewActions = require('../actions/ViewActions');
var ENTER_KEY = 13;

var ChatInput = React.createClass({
  getInitialState: function() {
    return {
      message:''
    }
  },

  handleChange: function(e) {
    var self = this;

    if(self._typeTimeout) {
      ViewActions.type();
    } else {
      clearTimeout(self._typeTimeout);
    }

    self._typeTimeout = setTimeout(function() {
      ViewActions.stopTyping();
      self._typeTimeout = null;
    }, self.props.debounce || 200);

    self.setState({
      message: e.target.value
    });
  },

  handleSubmit: function() {
    if(this.state.message.trim()) {
      ViewActions.sendMessage(this.state.message);
      this.setState({ message: '' });
    }
  },

  handleEnter: function(e) {
    if(e.keyCode === ENTER_KEY) this.handleSubmit();
  },

  render: function() {
    return (
      <div className="chat-input-container">
        <div className="chat-input-label">{this.props.label}</div>
        <div className="chat-input">
          <input
            disabled={this.props.disabled}
            className="input"
            type="text"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyDown={this.handleEnter}
            onSubmit={this.handleSubmit}/>
        </div>
      </div>
    )
  },

  _typeTimeout: null
});

module.exports = ChatInput;
