// client-side entry point
var
  React   = require('react'),
  ChatApp = require('./components/ChatApp.react');

// global react for debugging
window.React = React;

React.render(
  <ChatApp />,
  document.getElementById('app')
);