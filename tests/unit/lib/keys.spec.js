/* eslint-disable import/extensions */
import keys, { isControlKey } from '@/lib/keys.js';

describe('isControlKey', () => {
  it('omits left and right arrow keys', () => {
    expect(isControlKey(keys.LEFT)).toEqual(false);
    expect(isControlKey(keys.RIGHT)).toEqual(false);
  });

  it('identifies necesary keys for controlling the dropdown', () => {
    expect(isControlKey(keys.UP)).toEqual(true);
    expect(isControlKey(keys.DOWN)).toEqual(true);
    expect(isControlKey(keys.ESCAPE)).toEqual(true);
    expect(isControlKey(keys.TAB)).toEqual(true);
    expect(isControlKey(keys.SHIFT)).toEqual(true);
    expect(isControlKey(keys.ENTER)).toEqual(true);
  });
});
