var
  TextTypes         = require('../constants/Constants').TextTypes,
  StringToReactSpan = require('./StringToReactSpan');

// TODO: make a parser
module.exports = function(message) {
  switch(message.type) {
    case TextTypes.INIT:
      return [
        <span>
          <span className="text-var">{'var '}</span>
          <span className="text-operator">{'$'}</span>{'me '}
          <span className="text-operator">{'= new'}</span>{' User();'}
        </span>,
        ''
      ];

    // user joins
    case TextTypes.JOINED:
      return [
        <span>
        {'myChatRoom.newUser('}
          <span className="text-string">
            {"'"}{message.username}{"'"}
          </span>
        {');'}
        </span>
      ];

    // user leaves
    case TextTypes.LEFT:
      return [];

    // receive a new message from another user
    case TextTypes.NEW_MESSAGE:
      return [
        'myChatRoom.getMessage({',
        <span>
          <span className="text-indent">{'\u00A0\u00A0'}</span>
          {'from: '}
          <span className="text-string">
            {"'"}{message.username}{"'"}
          </span>
          {';'}
        </span>,
        <span>
          <span className="text-indent">{'\u00A0\u00A0'}</span>
          {'message: '}
          <span className="text-string">
            {"'"}{message.message}{"'"}
          </span>
          {';'}
        </span>,
        '};',
        ''
      ];

    // send a message to all
    case TextTypes.SEND_MESSAGE:
      return [
        <span>
          <span className="text-operator">{'$'}</span>{'me.sendMessage('}
          <span className="text-string">
            {"'"}{message.message}{"'"}
          </span>
          {');'}
        </span>
      ];

    case TextTypes.TYPING:
      return [
        <span className="text-comment">
          {'// '}{message.message}
        </span>
      ];
  }
}