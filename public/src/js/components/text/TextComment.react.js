var
  React = require('React'),
  TextComment;

TextComment = React.createClass({
  render: function() {
    return (
      <div key={this.props.number} className="line">
        <div className="line-number">{this.props.number}</div>
        <div className="line-message text-comment">{'//'} {this.props.comment}</div>
      </div>
    );
  }
});

module.exports = TextComment;