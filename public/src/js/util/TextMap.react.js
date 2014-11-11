var
  React     = require('react'),
  TextTypes = require('../constants/Constants').TextTypes;

// string
var S = React.createClass({
  render: function() {
    return (
      <span className="text-string">
        {"'"}{this.props.text}{"'"}
      </span>
    );
  }
});

// operator
var O = React.createClass({
  render: function() {
    return (
      <span className="text-operator">
        {this.props.text}
      </span>
    );
  }
});

// var
var V = React.createClass({
  render: function() {
    return (
      <span className="text-var">
        {this.props.text}
      </span>
    );
  }
});

// indent
var I = React.createClass({
  render: function() {
    return (
      <span className="text-indent">
        {'\u00A0\u00A0'}
      </span>
    );
  }
});

// comment
var C = React.createClass({
  render: function() {
    return (
      <span className="text-comment">
      {'// '}{this.props.text}
      </span>
    );
  }
});

module.exports = function(message) {
  switch(message.type) {
    case TextTypes.INIT:
      return [
        <span>
          <V text={'var '} /><O text={'$'} />{'me, users;'}
        </span>,

        '',

        <span>
          <O text={'$'} />{'me '}<O text={'= new'} />
          {' User();'}
        </span>,

        <span>
          {'users = {};'}
        </span>,

        '',

        <C text={'you have joined the room'}/>,

        <span>
        {'users['}<S text={message.username}/>{'] '}<O text={'= $'} />{'me;'}
        </span>,

        ''
      ];

    case TextTypes.JOINED:
      return [
        '',
        <C text={message.username + ' has joined the room'}/>,
        <span>
          {'users['}<S text={message.username}/>{'] '}<O text={'= new'}/>
          {' User();'}
        </span>,
        ''
      ];

    case TextTypes.LEFT:
      return [
        '',
        <C text={message.username + ' has left the room'}/>,
        <span>
          <O text={'delete'}/>{' users['}<S text={message.username}/>{'];'}
        </span>,
        ''
      ];

    // receive a new message from another user
    case TextTypes.NEW_MESSAGE:
      return [
        <span>
        {'users['}<S text={message.username}/>{'].read('}
          <S text={message.message}/>{');'}
        </span>
      ];

    // send a message to all
    case TextTypes.SEND_MESSAGE:
      return [
        <span>
          <O text={'$'} />{'me.send('}
          <S text={message.message} />{');'}
        </span>
      ];

    case TextTypes.TYPING:
      return [
        <C text={message.message}/>
      ];
  }
}