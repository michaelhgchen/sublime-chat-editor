// startup
function User(userame) {
  this._username = username;
}

User.prototype = {
  
}

function ChatRoom() {
  this._users = {};
}

ChatRoom.prototype({
  constructor: ChatRoom,

  addUser: function(username) {
    this._users[username] = new User('username');
  },

  removeUser: function(username) {
    delete this._users[username];
  }
});

var myChatRoom = new ChatRoom();