var
  React       = require('react'),
  TypingStore = require('../stores/TypingStore'),
  TextTypes   = require('../contants/Constants').TextTypes,
  TextMap     = require('./text/TextMap.react'),
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

    messages = [{
      type: TextTypes.COMMENT,
      message: 'list of all messages'
    }];

    messages = messages.concat(this.props.messages);

    if(this.state.typingText) {
      messages = messages.concat([
        type: TextTypes.COMMENT,
        message: this.state.typingText
      ]);
    }

    MessageConverter(messages);

    return (
      <div className="message-list">
        {messages}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = MessageList;