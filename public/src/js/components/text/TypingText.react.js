var
  React = require('react'),
  TypingText;

TypingText = React.createClass({
  render: function() {
    return (
      <span className="text-comment">
        {'// '}
        {this.props.username}
        {' is typing...'}
      </span>
    );
  }
});

module.exports = TypingText;