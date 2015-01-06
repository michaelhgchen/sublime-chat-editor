var React = require('react');
var ViewActions = require('../actions/ViewActions');
var ENTER_KEY = 13;
var UP_KEY = 38;
var DOWN_KEY = 40;

var ChatInput = React.createClass({
  getInitialState: function() {
    return {
      message:'',
      focused: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if(!this.state.focused
        && nextProps.focus) {
      this.focusInput();
      this.setState({
        focused: true
      });
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
    }, 500);

    self.setState({
      message: e.target.value
    });
  },

  handleSubmit: function() {
    var message = this.state.message.trim();
    if(message) {
      if(message === '/clear') {
        ViewActions.resetMessages();
      } else if (message === '/hide') {
        ViewActions.hideMessages();
      } else if (message === '/show') {
        ViewActions.showMessages();
      } else {
        ViewActions.sendMessage(message);
      }

      this._previousMessage = message;
      this.setState({ message: '' });
    }
  },

  showPreviousMessage: function() {
    this.setState({
      message: this._previousMessage
    });
  },

  handleKeydown: function(e) {
    if(e.keyCode === ENTER_KEY) this.handleSubmit();
    if(e.keyCode === UP_KEY) this.showPreviousMessage();
  },

  focusInput: function() {
    var chatInput = this.refs.chatInput.getDOMNode();

    // lol
    setTimeout(function() {
      chatInput.focus();
    }, 0);
  },

  render: function() {
    return (
      <div className="chat-input-container">
        <div className="chat-input-label">{this.props.label}</div>
        <div className="chat-input">
          <input
            ref="chatInput"
            disabled={this.props.disabled}
            className="input"
            type="text"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyDown={this.handleKeydown}
            onSubmit={this.handleSubmit}/>
        </div>
      </div>
    )
  },

  _typeTimeout: null,
  _previousMessage: ''
});

module.exports = ChatInput;
