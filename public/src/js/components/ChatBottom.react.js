var
  React       = require('react/addons'),
  ViewActions = require('../actions/ViewActions'),
  ENTER_KEY   = 13,
  typingTimeout, debounce, ChatBottom;

debounce = 500;

ChatBottom = React.createClass({
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
    if(!typingTimeout) {
      ViewActions.typing();
    } else {
      clearTimeout(typingTimeout);
    }

    typingTimeout = setTimeout(function() {
      ViewActions.stopTyping();
      typingTimeout = null;
    }, debounce);

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
    var lineNumber;

    lineNumber = this.props.messages.length;

    return (
      <div className="chat-bottom">
        <div className="chat-input-container">

          <div className="chat-input-label">File Name:</div>
          <div className="chat-input">
            <input
              disabled={!this.props.loggedIn}
              className="input"
              type="text"
              value={this.state.message}
              ref="chatInput"
              onChange={this.handleChange}
              onKeyDown={this.handleEnter}
              onSubmit={this.handleSubmit}/>
          </div>
        </div>
        <div className="chat-stats">
          Line {lineNumber + 1}, Column 1
          <div className="pull-right chat-stats-info no-mobile">JavaScript</div>
          <div className="pull-right chat-stats-info no-mobile">Spaces: 2</div>
        </div>
      </div>
    );
  }
});

module.exports = ChatBottom;