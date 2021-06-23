
const keys = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ESCAPE: 27,
  ENTER: 13,
  SHIFT: 16,
  TAB: 9,
};

export function isControlKey(key) {
  return Object.values(keys).filter(k => k !== keys.LEFT && k !== keys.RIGHT).includes(key);
}

export function isDirectionalKey(key) {
  return key === keys.LEFT || key === keys.RIGHT;
}

export default keys;
