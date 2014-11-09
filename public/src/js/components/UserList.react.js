var
  React = require('react'),
  UserList;

UserList = React.createClass({
  render: function() {
    var allUsers;

    allUsers = Object.keys(this.props.allUsers).map(function(user) {
      return (
        <li key={user}>{user}</li>
      );
    });

    return (
      <ul className="user-list">
        <li>users</li>
        {allUsers}
      </ul>
    );
  }
});

module.exports = UserList;