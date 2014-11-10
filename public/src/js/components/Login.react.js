var
  React       = require('react'),
  LoginStore  = require('../stores/LoginStore'),
  ViewActions = require('../actions/ViewActions'),
  ENTER_KEY   = 13,
  Login;

function getStateFromStores() {
  return {
    loginError: LoginStore.getLoginError()
  };
}

Login = React.createClass({
  getInitialState: function() {
    var state;

    state = getStateFromStores();
    state.name = '';

    return state;
  },

  componentDidMount: function() {
    LoginStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },

  handleSubmit: function() {
    var name;

    name = this.state.name.trim();

    if(name) {
      ViewActions.newUser(name);
    }
  },

  handleChange: function(e) {
    this.setState({
      name: e.target.value,
      loginError: ''
    });
  },

  handleEnter: function(e) {
    if(e.keyCode === ENTER_KEY) {
      this.handleSubmit();
    }
  },

  render: function() {
    var name, loginError, listing;

    name = this.state.name.trim();
    loginError = this.state.loginError;
    listing = [
      loginError
        ? loginError.replace('Name', name)
        : 'Choose a Nickname',
      'Developed by Michael Chen Using: Node, React, Flux and Socket.IO',
      'Sublime Chat Editor: A Chat Application That Looks Like Sublime'
    ];

    listing = listing.map(function(list) {
      var toMatch, toReplace;

      toMatch = new RegExp(name, 'gi');
      toReplace = ['<span class="login-bold">', '$&', '</span>'].join('');

      if(list.match(toMatch)) {
        return <li key={list}
          dangerouslySetInnerHTML={{__html: list.replace(toMatch, toReplace)}}/>;
      } else {
        return null;
      }
    });

    return (
      <div className="login-overlay">
        <div className="login-container">
          <input className="input"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            onKeyDown={this.handleEnter}
            onSubmit={this.handleSubmit}/>
          <ul className="login-list">
            {listing}
          </ul>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = Login;