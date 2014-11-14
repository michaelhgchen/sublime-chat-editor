var Constants = require('../constants/FluxConstants');
var LanguageClasses = Constants.LanguageClasses;
var MessageTypes = Constants.MessageTypes;

// regex meta characters
// ^ [ . $ { * ( \ + ) | ? < >

/*
  var - 'var', 'function'
  function - method, function name
  operator - shit load of operators
  string - surrounded by '' or "" (high priority)
  argument - after function in parentheses
  indent - {{indent}}
  reserved - prototype, log, etc?
  comment - // or the other one based on line
  entity - number, escaped stuff, null, undefined
 */

// variables, function keyword
var VAR_REGEX = /\bvar|function\b/;
var INDENT_REGEX = /\{\{indent\}\}/;

// methods, function name
// var FUNCTION_REGEX = /\b\b/;
var NUMBERS_REGEX = /\b[0-9]+\b/;
var STRING_REGEX = /'.*'||".*"/;

var OPERATORS = [
  '\\+','-','\\*','=','~','!','\\$','\\*','~','\\<','\\>','&&','\\|\\|',
].join('|');

var KEYWORDS = [
  'break','case','catch','const','continue','debugger','default','delete',
  'do','else','export','extends','finally','for','if','import','in','instanceof',
  'new','return','switch','throw','try','typeof','while','with'
].join('|');

var OPERATORS_REGEX = new RegExp('\\b' + OPERATORS + '\\b');
var KEYWORDS_REGEX = new RegExp('\\b' + OPERATOR_KEYWORDS + '\\b');

function MessageParser(message) {
  return message;
}

module.exports = MessageParser;