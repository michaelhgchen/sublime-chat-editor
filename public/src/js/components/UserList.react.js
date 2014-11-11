var
  React = require('react/addons'),
  UserList;

UserList = React.createClass({
  render: function() {
    var allUsers;

    allUsers = Object.keys(this.props.allUsers).map(function(user) {
      return (
        <li key={user}>
          <i className="icon-file-code-o"></i>
          {user}.js
        </li>
      );
    });

    return (
      <div className="user-list-container no-mobile">
        <div className="user-list-title">Folders</div>
        <ul className="folder">
          <li className="open"><i className="icon-folder-open-o"></i>users</li>
          <ul className="folder-contents">
            {allUsers}
          </ul>
        </ul>
      </div>
    );
  }
});

module.exports = UserList;