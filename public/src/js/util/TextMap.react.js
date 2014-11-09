var
  TextTypes    = require('../constants/Constants').TextTypes,
  CommentText  = require('../components/text/CommentText.react'),
  VarText      = require('../components/text/VarText.react'),
  OperatorText = require('../components/text/OperatorText.react'),
  StringText   = require('../components/text/StringText.react');

module.exports = function(message) {
  switch(message.type) {
    case TextTypes.INIT:
      return []; 

    // user joins
    case TextTypes.JOINED:
      return [
        <span>
          <VarText text={'var'} />
          {' '}{message.username}{' '}
          <OperatorText text={'= new'} />
          {' '}{'User();'}
        </span>
      ];

    // user leaves
    case TextTypes.LEFT:
      return [
        <span>
          <OperatorText text={'delete'} />{' '}
          {'Users['}
          <StringText text={message.username} />
          {'];'}
        </span>
      ];

    // receive a new message from another user
    case TextTypes.NEW_MESSAGE:
      return [
        <span>
          {message.username}
          {'.getMessage('}
          <StringText text={message.message} />
          {');'}
        </span>
      ];

    // send a message to all
    case TextTypes.SEND_MESSAGE:
      return [
        <span>
          {'sendMessage('}
            <StringText text={message.message} />
          {');'}
        </span>
      ];

    // general comments
    case TextTypes.COMMENT:
      return [
        <CommentText 
          text={message.message} />
      ];
  }
}