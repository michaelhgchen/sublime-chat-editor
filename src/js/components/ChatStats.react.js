var React = require('react');

var ChatStats = React.createClass({
  render: function() {
    return (
      <div className="chat-stats">
        Line {this.props.line}, Column {this.props.column}
        <div className="pull-right chat-stats-info no-mobile">
          {this.props.language || 'JavaScript'}
        </div>
        <div className="pull-right chat-stats-info no-mobile">
          Spaces: {this.props.spaces || 2}
        </div>
      </div>
    )
  }
});

module.exports = ChatStats;

