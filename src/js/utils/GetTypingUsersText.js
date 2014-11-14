module.exports = function() {
  var typingUsers, typingUsersNum, typingText;

  typingUsers   = Object.keys(this.getTypingUsers()),
  typingUserNum = typingUsers.length,
  typingText    = '';

  if(typingUserNum) {
    if(typingUserNum === 1) {
      typingText = typingUsers[0] + ' is typing...';
    } else if (typingUserNum < 4) {
      typingText = [
        typingUsers.slice(0, 2).join(', '),
        'and',
        typingUsers[2],
        'are typing...'
      ].join(' ');
    } else {
      typingText = [
        typingUsers.slice(0, 2).join(', '),
        'and',
        typingUserNum - 2,
        'other users are typing...'
      ].join(' ');
    }
  }

  return typingText;
},