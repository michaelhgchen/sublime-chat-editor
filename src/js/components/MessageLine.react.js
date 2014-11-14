var React = require('React');

var MessageLine = React.createClass({
  render: function() {
    return (
      <div className="line">
        <div className="line-number">{this.props.line}</div>
        <div className="line-message">
          {this.props.message}
        </div>
      </div>
    );
  }
});

module.exports = MessageLine;