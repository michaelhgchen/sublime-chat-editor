var
  React = require('react'),
  Store = require('../stores/Store');

function getStateFromStores() {
  return {
    message: Store.getMessage()
  };
}

var App = React.createClass({
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
    var message = this.state.message;

    return (
      <div>
        <h1>{message}</h1>
      </div>
    )
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = App;