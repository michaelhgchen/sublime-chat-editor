// this is pretty much keyMirror() in Facebook React repo's src/utils
//
// given an object, return the object where
// all keys' values are key's string
//
// ex: enumify{a:5, b:null} --> {a:'a', b:'b'}
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