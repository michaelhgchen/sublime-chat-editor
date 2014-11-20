var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var classSet = React.addons.classSet;
var File = require('./File.react');

var Folder = React.createClass({
  getInitialState: function() {
    return { open: true }
  },

  toggleContents: function() {
    this.setState({ open: !this.state.open });
  },

  render: function() {
    var folderContentsBody, folderContents, listClasses;

    if(this.state.open) {
      folderContentsBody = this.props.contents.map(function(elem) {
        return <File key={elem} name={elem}/>;
      });

      folderContents = (
        <ul key="open" className="folder-contents">
          {folderContentsBody}
        </ul>
      );
    } else {
      folderContents = <ul key="closed-folder"></ul>;
    }

    listClasses = classSet({
      'open': this.state.open,
      'closed': !this.state.open,
      'no-select': true
    });

    return (
      <ul className="folder">
        <li onClick={this.toggleContents} className={listClasses}>
          <i className="icon-arrow"></i><i className="icon-folder">
          </i>{this.props.name}</li>
        <CSSTransitionGroup transitionName="folder-toggle-transition">
          {folderContents}
        </CSSTransitionGroup>
      </ul>
    );
  }
});

module.exports = Folder;