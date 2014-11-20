var React = require('react');

var File = React.createClass({
  render: function() {
    return (
      <li>
        <i className="icon-file-code-o"></i>
        {this.props.name}{this.props.extension || '.js'}
      </li>
    );
  }
});

module.exports = File;