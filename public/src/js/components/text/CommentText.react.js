var
  React = require('react'),
  CommentText;

CommentText = React.createClass({
  render: function() {
    return (
      <span className="text-comment">{'//'} {this.props.text}</span>
    );
  }
});

module.exports = CommentText;