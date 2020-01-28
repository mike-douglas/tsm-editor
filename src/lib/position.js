
export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

/**
 * Returns a zero-width rectangle representing the caret in a text selection.
 *
 * @param {selection} selection
 */
export function getCaretRect(selection) {
  try {
    const range = selection.getRangeAt(0).cloneRange();

    if (range.getClientRects) {
      range.collapse(true);

      const rects = range.getClientRects();
      const rect = rects.length > 0 ? rects[0] : null;

      if (rect) {
        return new Rect(rect.left, rect.top, 0, rect.height);
      }
    }
  } catch (DOMExeption) {
    // No selection
  }

  return new Rect(0, 0, 0, 0);
}

/**
 * Return the caret position in a text selection or text entry.
 *
 * @param {selection} selection
 */
export function getCaretPosition(selection) {
  const rect = getCaretRect(selection);

  return new Position(rect.x, rect.y + rect.height);
}
