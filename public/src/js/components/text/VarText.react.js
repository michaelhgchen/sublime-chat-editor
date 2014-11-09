var
  React = require('react'),
  VarText;

VarText = React.createClass({
  render: function() {
    return (
      <span className="text-var">{this.props.text}</span>
    );
  }
});

module.exports = VarText;