var React = require('react');
var Folder = require('./Folder.react');
var TypingUserStore = require('../stores/TypingUserStore');

function getStateFromStores() {
  return {
    typingUsers: TypingUserStore.getTypingUsers()
  }
}

var Sidebar = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TypingUserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TypingUserStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var allFolders = [];
    var typingUsers = this.state.typingUsers;
    var allUsers = Object.keys(this.props.allUsers).map(function(user){
      if(typingUsers[user]) {
        return '*' + user;
      }

      return user;
    });

    var userFolder = <Folder
      key="users"
      name="users"
      contents={allUsers} />;

    allFolders.push(userFolder);

    return (
      <div className="user-list-container no-mobile">
        <div className="user-list-title">Folders</div>
        {allFolders}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = Sidebar;