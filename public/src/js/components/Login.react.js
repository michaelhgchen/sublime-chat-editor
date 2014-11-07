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
    if(this.state.name) {
      ViewActions.newUser(this.state.name);
    }
  },

  handleChange: function(e) {
    this.setState({
      name: e.target.value
    });
  },

  handleEnter: function(e) {
    if(e.keyCode === ENTER_KEY) {
      this.handleSubmit();
    }
  },

  render: function() {
    return (
      <div className="overlay">
        <div className="login-container">
          <h1 className="login-title">What is your name?</h1>
          <input className="login-input"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            onKeyDown={this.handleEnter}
            onSubmit={this.handleSubmit}/>
          <div className="login-error">{this.state.loginError}</div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});


module.exports = Login;