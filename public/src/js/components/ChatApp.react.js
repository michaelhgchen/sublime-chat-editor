var
  React     = require('react'),
  Store     = require('../stores/Store'),
  ChatName  = require('./ChatName.react'),
  ChatInput = require('./ChatInput.react'),
  ChatLog   = require('./ChatLog.react');

function getStateFromStores() {
  return {
    messages: Store.getMessages()
  }
}

var ChatApp = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <ChatName />
        <ChatInput />
        <ChatLog
          messages={this.state.messages}/>
      </div>
    )
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = ChatApp;