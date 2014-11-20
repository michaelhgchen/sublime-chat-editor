var React = require('React');

var MessageLine = React.createClass({displayName: 'MessageLine',
  render: function() {
    return (
      React.createElement("div", {className: "line"}, 
        React.createElement("div", {className: "line-number"}, this.props.line), 
        React.createElement("div", {className: "line-message", 
          dangerouslySetInnerHTML: {__html: this.props.message}})
      )
    );
  }
});

module.exports = MessageLine;