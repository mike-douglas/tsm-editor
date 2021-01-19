
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
 * Return the range representing the caret.
 *
 * If the selection is not collapsed (size > 0), return null.
 */
export function getCurrentCaretRange() {
  const sel = window.getSelection();

  return sel.getRangeAt(0);
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
 */
export function getCaretPosition() {
  const rect = getCaretRect(window.getSelection());

  return new Position(rect.x, rect.y + rect.height);
}

/**
 * Sets the current selection range to the line, position within the editor.
 *
 * @param {TextRange} newCaret The new caret to set
 */
export function setCaretRange(newCaret) {
  newCaret.collapse(true);

  const selection = window.getSelection();

  selection.removeAllRanges();
  selection.addRange(newCaret);
}

/**
 * Replace a range in the string with a new substring and return it.
 *
 * @param {string} text The string to make a replacement in
 * @param {string} replacement The replacement string
 * @param {TextRange} range The range where the replacement will occur
 */
export function replaceTextInRange(text, replacement, range) {
  return text.substring(0, range.startOffset) + replacement + text.substring(range.endOffset);
}
