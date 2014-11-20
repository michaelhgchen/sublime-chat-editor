var React = require('react');
var ChatApp = require('../compiled-app/ChatApp.react');

module.exports = function() {
  return React.renderToString(ChatApp({}));
};