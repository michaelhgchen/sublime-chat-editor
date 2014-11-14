var
  React   = require('react'),
  ChatApp = require('./components/ChatApp.react');

window.React = React; // global react for debugging

React.render(
  <ChatApp />,
  document.getElementById('app')
);