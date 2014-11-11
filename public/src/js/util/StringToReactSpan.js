var
  React = require('react');

module.exports = function(string) {
  return (
    <span dangerouslySetInnerHTML={{__html: string}} />
  );
}