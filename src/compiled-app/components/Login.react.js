var React = require('react');
var ViewActions = require('../actions/ViewActions');
var ENTER_KEY = 13;

var Login = React.createClass({displayName: 'Login',
  getInitialState: function() {
    return { name: '' };
  },

  handleSubmit: function() {
    var name = this.state.name.trim();

    name && ViewActions.setUsername(name);
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
      'Developed by Michael Chen Using: Node, React, Flux and Socket.IO',
      'Sublime Chat Editor: A Chat Application That Looks Like Sublime'
    ];

    // filter listings
    listings = listings.map(function(listing) {
      var toMatch, toReplace;

      toMatch = new RegExp(name, 'gi');
      toReplace = ['<span class="login-bold">', '$&', '</span>'].join('');

      if(listing.match(toMatch)) {
        return React.createElement("li", {key: listing, 
          dangerouslySetInnerHTML: {__html: name
            ? listing.replace(toMatch, toReplace)
            : listing}});
      } else {
        return null;
      }
    });

    return (
      React.createElement("div", {className: "login-overlay"}, 
        React.createElement("div", {className: "login-container"}, 
          React.createElement("input", {className: "input", 
            type: "text", 
            value: this.state.name, 
            onChange: this.handleChange, 
            onKeyDown: this.handleEnter, 
            onSubmit: this.handleSubmit}), 
          React.createElement("ul", {className: "login-list"}, 
            listings
          )
        )
      )
    );
  }
});

module.exports = Login;