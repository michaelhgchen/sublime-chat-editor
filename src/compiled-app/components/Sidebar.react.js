var React = require('react');
var Folder = require('./Folder.react');

var Sidebar = React.createClass({displayName: 'Sidebar',
  render: function() {
    var allFolders = [];

    var userFolder = React.createElement(Folder, {
      key: "users", 
      name: "users", 
      contents: Object.keys(this.props.allUsers)});

    allFolders.push(userFolder);

    return (
      React.createElement("div", {className: "user-list-container no-mobile"}, 
        React.createElement("div", {className: "user-list-title"}, "Folders"), 
        allFolders
      )
    );
  }
});

module.exports = Sidebar;