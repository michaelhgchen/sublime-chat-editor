var
  React = require('react'),
  Folder;

Folder = React.createClass({
  getInitialState: function() {
    return {
      open: false
    }
  },

  render: function() {
    var open;

    open = this.state.open;

    return (
      <ul className="folder">
        <li className={open ? 'open' : 'closed'}>{this.props.name}</li>
          <ul className="folder-contents">
            {open ? this.props.children : null}
          </ul>
      </ul>
    );
  }
});

module.exports = Folder;