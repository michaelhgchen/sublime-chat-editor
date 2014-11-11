var
  React              = require('react/addons'),
  CSSTransitionGroup = require('react/addons').addons.CSSTransitionGroup,
  UserList;

UserList = React.createClass({
  getInitialState: function() {
    return {
      open: true
    }
  },

  toggleContents: function() {
    this.setState({
      open: !this.state.open
    });
  },

  render: function() {
    var folderContents, allUsers;

    if(this.state.open) {
      allUsers = Object.keys(this.props.allUsers).map(function(user) {
        return (
          <li key={user}>
            <i className="icon-file-code-o"></i>
            {user}.js
          </li>
        );
      });

      folderContents = (
        <ul key="open-folder" className="folder-contents">
          {allUsers}
        </ul>
      );
    } else {
      folderContents = <ul key="closed-folder"></ul>;
    }

    return (
      <div className="user-list-container no-mobile">
        <div className="user-list-title">Folders</div>
        <ul className="folder">
          <li onClick={this.toggleContents} className={this.state.open ? 'open' : 'closed'}>
            <i className="icon-arrow"></i><i className="icon-folder">
            </i>users</li>
          <CSSTransitionGroup transitionName="folder-toggle-transition">
            {folderContents}
          </CSSTransitionGroup>
        </ul>
      </div>
    );
  }
});

module.exports = UserList;