var
  React = require('react'),
  ArgumentText;

ArgumentText = React.createClass({
  render: function() {
    return (
      <span className="text-argument">{this.props.text}</span>
    );
  }
});

module.exports = ArgumentText;