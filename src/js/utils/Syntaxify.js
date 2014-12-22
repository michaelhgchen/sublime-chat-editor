function mergeAlternate(first, second) {
  var merged, index, i, j;

  merged = [];
  index = 0;

  for(i = 0, j = second.length + first.length; i < j; ++i) {
    if (i % 2 === 0) {
      merged.push(first[index]);
    } else {
      merged.push(second[index++]);
    }
  }

  return merged;
}

// convert regex to a string passable to new RegExp()
function regexToRegexString(regex) {
  return regex.toString().slice(1, -1);
}

// change an existing regex to add a modifier such as 'g' for global
function addRegexModifier(regex, modifier) {
  return new RegExp(regexToRegexString(regex), modifier);
}

function Syntaxify(passes) {
  this._passes = passes;
}

Syntaxify.prototype.toHTMLString = function(source) {
  var pass, transformed, toTransform, toMatch;

  pass = arguments[1];
  !pass && (pass = 0);

  if(pass === this._passes.length) return source;

  toMatch = addRegexModifier(this._passes[pass].regex, 'g');
  transformed = source.match(toMatch);

  if(transformed === null) return this.toHTMLString(source, pass + 1);

  transformed = transformed.map(function(s) {
    return s.replace(toMatch, this._passes[pass].process);
  }.bind(this));

  // TODO: Don't do this
  toTransform = source.replace(toMatch, '<').split('<');

  toTransform = toTransform.map(function(s) {
    return this.toHTMLString(s, pass + 1);
  }.bind(this));

  return mergeAlternate(toTransform, transformed).join('');
}

module.exports = function(passes) {
  return new Syntaxify(passes);
}