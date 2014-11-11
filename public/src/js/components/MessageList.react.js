var
  React            = require('react/addons'),
  TypingStore      = require('../stores/TypingStore'),
  TextTypes        = require('../constants/Constants').TextTypes,
  MessageConverter = require('../util/MessageConverter.react'),
  MessageList;

function getStateFromStores() {
  return {
    typingText: TypingStore.getTypingText()
  }
}

MessageList = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TypingStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TypingStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var messages;

    messages = this.props.messages.slice(0);

    if(this.state.typingText) {
      messages.push({
        type: TextTypes.TYPING,
        message: this.state.typingText
      });
    }

    return (
      <div className="message-list">
        <div className="message-list-header">
          <i className="left-arrow"></i>
          <i className="right-arrow"></i>
          <i className="pull-right down-arrow"></i>
        </div>
        {MessageConverter(messages)}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = MessageList;