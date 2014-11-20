var React = require('react');

var File = React.createClass({displayName: 'File',
  render: function() {
    return (
      React.createElement("li", null, 
        React.createElement("i", {className: "icon-file-code-o"}), 
        this.props.name, this.props.extension || '.js'
      )
    );
  }
});

module.exports = File;