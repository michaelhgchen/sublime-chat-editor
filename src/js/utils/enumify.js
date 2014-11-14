/**
 * This is pretty much keyMirror() in Facebook React repo's src/utils
 * Given an object, return an object whose keys are the same as the given
 * object, but whose values are set equal to the keys
 *
 * ex: {a:1, b:null} --> {a:'a', b:'b'}
 *
 * @param  {Object} obj Any object
 * @return {Object}     An object with same keys and values as argument keys
 */
function enumify(obj) {
  var enumObj, keys, key, num;

  enumObj = {};
  keys = Object.keys(obj);
  num = keys.length;

  while(num--) {
    key = keys[num];
    enumObj[key] = key;
  }

  return enumObj;
}

module.exports = enumify;