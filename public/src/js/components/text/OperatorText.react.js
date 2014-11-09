var 
  React = require('react'),
  OperatorText;

OperatorText = React.createClass({
  render: function() {
    return (
      <span className="text-operator">{this.props.text}</span>
    );
  }
});

module.exports = OperatorText;