var React = require('react');

var ChatStats = React.createClass({displayName: 'ChatStats',
  render: function() {
    return (
      React.createElement("div", {className: "chat-stats"}, 
        "Line ", this.props.line, ", Column ", this.props.column, 
        React.createElement("div", {className: "pull-right chat-stats-info no-mobile"}, 
          this.props.language || 'JavaScript'
        ), 
        React.createElement("div", {className: "pull-right chat-stats-info no-mobile"}, 
          "Spaces: ", this.props.spaces || 2
        )
      )
    )
  }
});

module.exports = ChatStats;

