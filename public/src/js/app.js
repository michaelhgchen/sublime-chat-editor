var
  React   = require('react'),
  ChatApp = require('./components/ChatApp.react');

window.React = React;

var socket =
React.render(
  <ChatApp />,
  document.getElementById('app')
);