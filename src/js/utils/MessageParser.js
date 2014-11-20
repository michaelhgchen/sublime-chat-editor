var Constants = require('../constants/FluxConstants');
var LanguageClasses = Constants.LanguageClasses;
var MessageTypes = Constants.MessageTypes;

var INDENT_REGEX = /\{\{indent\}\}/;
var COMMENT_REGEX = /\/\*[\s\S]*?\*\/|\/\/[^\n]*(?:$|\n)/;
var STRING_REGEX = /("|')[\s\S]*?\1/;
var FUNCTION_REGEX = /\b(function)(?:(\s+?)(\w+?))?(\s*?\()([\w,\s]*?)(\))(\s*?\{)/;
var OPERATOR_REGEX = /'-|static|\+|\*|=|~|!|\$|\*|~|\<|\>|&&|\|\|'/;
var KEYWORD_REGEX = /\b(?:break|case|catch|const|continue|debugger|default|delete|do|else|export|extends|finally|for|if|import|in|instanceof|new|return|switch|throw|try|typeof|while|with)\s/;
var NUMBER_REGEX = /\b[0-9]+\b/;
var VAR_REGEX  = /\bvar\b/;
var RESERVED_REGEX = /\.(?:log|port)/; // lazy

var escapeHtml = require('./escapeHtml');

function wrapSpanFactory(className) {
  return function(source) {
    return '<span class="' + className + '">' + escapeHtml(source) + '</span>';
  }
}

// rules for JavaScript syntax transform
var passes = [
  {
    regex: INDENT_REGEX,
    process: function() {
      return '<span class="text-indent">&nbsp;&nbsp;</span>'
    }
  },
  {
    regex: COMMENT_REGEX,
    process: wrapSpanFactory(LanguageClasses.COMMENT)
  },
  {
    regex: STRING_REGEX,
    process: wrapSpanFactory(LanguageClasses.STRING)
  },
  {
    regex: FUNCTION_REGEX,
    process: function(source) {
      return source.replace(FUNCTION_REGEX,
        '<span class="text-var">$1</span>$2<span class="text-function">\
        $3</span>$4<span class="text-argument">$5</span>$6$7'
      );
    }
  },
  {
    regex: OPERATOR_REGEX,
    process: wrapSpanFactory(LanguageClasses.OPERATOR)
  },
  {
    regex: KEYWORD_REGEX,
    process: wrapSpanFactory(LanguageClasses.OPERATOR)
  },
  {
    regex: NUMBER_REGEX,
    process: wrapSpanFactory(LanguageClasses.NUMBER)
  },
  {
    regex: VAR_REGEX,
    process: wrapSpanFactory(LanguageClasses.VAR)
  },
  {
    regex: RESERVED_REGEX,
    // TODO: Don't be lazy
    process: function(source) {
      return '.<span class="text-reserved">' + source.slice(1) + '</span>';
    }
  }
];

var MessageTransformer = require('./StringTransformer')(passes);

module.exports = function(message) {
  return MessageTransformer.transform(message);
};