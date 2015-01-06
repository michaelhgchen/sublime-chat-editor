var React = require('react');
var ViewActions = require('../actions/ViewActions');
var ENTER_KEY = 13;

var Login = React.createClass({
  getInitialState: function() {
    return { name: '' };
  },

  handleSubmit: function() {
    var name = this.state.name.trim();

    name && ViewActions.login(name);
  },

  handleChange: function(e) {
    this.setState({ name: e.target.value });
  },

  handleEnter: function(e) {
    e.keyCode === ENTER_KEY && this.handleSubmit();
  },

  render: function() {
    var name = this.state.name.trim();

    var listings = [
      'Choose a Nickname',
      'Node/Express, React, Flux and Socket.IO',
      'Sublime Chat Editor: A Chat Application That Looks Like Sublime'
    ];

    // filter listings
    listings = listings.map(function(listing) {
      var toMatch, toReplace;

      toMatch = new RegExp(name, 'gi');
      toReplace = ['<span class="login-bold">', '$&', '</span>'].join('');

      if(listing.match(toMatch)) {
        return <li key={listing}
          dangerouslySetInnerHTML={{__html: name
            ? listing.replace(toMatch, toReplace)
            : listing }}/>;
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
            onSubmit={this.handleSubmit}
            autoFocus={true}/>
          <ul className="login-list">
            {listings}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Login;