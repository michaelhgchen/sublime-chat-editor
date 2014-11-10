var
  React = require('react'),
  FunctionText;

FunctionText = React.createClass({
  render: function() {
    return (
      <span className="text-function">{this.props.text}</span>
    );
  }
});

module.exports = FunctionText;