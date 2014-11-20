var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var classSet = React.addons.classSet;
var File = require('./File.react');

var Folder = React.createClass({displayName: 'Folder',
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
        return React.createElement(File, {key: elem, name: elem});
      });

      folderContents = (
        React.createElement("ul", {key: "open", className: "folder-contents"}, 
          folderContentsBody
        )
      );
    } else {
      folderContents = React.createElement("ul", {key: "closed-folder"});
    }

    listClasses = classSet({
      'open': this.state.open,
      'closed': !this.state.open,
      'no-select': true
    });

    return (
      React.createElement("ul", {className: "folder"}, 
        React.createElement("li", {onClick: this.toggleContents, className: listClasses}, 
          React.createElement("i", {className: "icon-arrow"}), React.createElement("i", {className: "icon-folder"}
          ), this.props.name), 
        React.createElement(CSSTransitionGroup, {transitionName: "folder-toggle-transition"}, 
          folderContents
        )
      )
    );
  }
});

module.exports = Folder;