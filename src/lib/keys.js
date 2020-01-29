
const keys = {
  KEY_UP: 38,
  KEY_DOWN: 40,
  KEY_ESCAPE: 27,
  KEY_ENTER: 13,
};

export function isControlKey(key) {
  return Object.values(keys).includes(key);
}

export default keys;
