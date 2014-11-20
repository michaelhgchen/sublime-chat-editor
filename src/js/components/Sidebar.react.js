var React = require('react');
var Folder = require('./Folder.react');

var Sidebar = React.createClass({
  render: function() {
    var allFolders = [];

    var userFolder = <Folder
      key="users"
      name="users"
      contents={Object.keys(this.props.allUsers)} />;

    allFolders.push(userFolder);

    return (
      <div className="user-list-container no-mobile">
        <div className="user-list-title">Folders</div>
        {allFolders}
      </div>
    );
  }
});

module.exports = Sidebar;