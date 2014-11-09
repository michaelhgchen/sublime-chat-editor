var
  React = require('react'),
  StringText;

StringText = React.createClass({
  render: function() {
    return (
      <span className="text-string">
        {"'"}{this.props.text}{"'"}
      </span>
    );
  }
});

module.exports = StringText;