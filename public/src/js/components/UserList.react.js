var
  React = require('react'),
  UserList;

UserList = React.createClass({
  render: function() {
    var allUsers;

    allUsers = Object.keys(this.props.allUsers).map(function(user) {
      return (
        <li>{user}</li>
      );
    });

    return (
      <ul className="user-list">
        <li><b>users</b></li>
        {allUsers}
      </ul>
    );
  }
});

module.exports = UserList;