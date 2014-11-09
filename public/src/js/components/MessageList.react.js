var
  React            = require('react'),
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
        type: TextTypes.COMMENT,
        message: this.state.typingText
      });
    }

    return (
      <div className="message-list">
      {MessageConverter(messages)}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = MessageList;