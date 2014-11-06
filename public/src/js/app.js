var
  React = require('react'),
  App   = require('./components/App.react');

window.React = React;

React.render(
  <App />,
  document.getElementById('app')
);