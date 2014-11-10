var
  React = require('react'),
  IndentText;

IndentText = React.createClass({
  render: function() {
    var indents, i, j;

    indents = [];

    for(i = 0, j = this.props.number; i < j; ++i) {
      indents.push(
        <span className="text-indent">{'\u00A0\u00A0'}</span>
      );
    };

    return (
      <span>
        {indents}
      </span>
    );
  }
});

module.exports = IndentText;
