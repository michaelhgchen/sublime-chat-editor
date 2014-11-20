var React = require('React');

var MessageLine = React.createClass({
  render: function() {
    return (
      <div className="line">
        <div className="line-number">{this.props.line}</div>
        <div className="line-message"
          dangerouslySetInnerHTML={{__html: this.props.message}} />
      </div>
    );
  }
});

module.exports = MessageLine;