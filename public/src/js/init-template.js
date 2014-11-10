function User(username) {
  this._username = username;
  this._history  = [];
}

User.prototype = {
  constructor: User,

  sendMessage: function(message) {
    this._history.push({
      from: this._username,
      message: message,
    });
  },

  getMessage: function(message) {
    this._history.push(message);
  }
}

var $me, myChatRoom;

$me = new User('username');
myChatRoom = {};

// message received
$me.getMessage({
  from: 'michael',
  message: ''
});

// message sent
$me.sendMessage('');

// USER has joined
myChatRoom['michael'] = new User('michael');

// USER has left
delete myChatRoom['michael'];