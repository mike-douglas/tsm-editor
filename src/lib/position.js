
export function Position(x, y) {
  this.x = x;
  this.y = y;
}

export function getCaretPosition(selection) {
  const range = selection.getRangeAt(0).cloneRange();

  if (range.getClientRects) {
    range.collapse(true);

    const rects = range.getClientRects();
    const rect = rects.length > 0 ? rects[0] : null;

    if (rect) {
      return new Position(rect.left, rect.top);
    }
  }
  return new Position(-1, -1);
}
