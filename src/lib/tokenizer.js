
export function tokenizeByWord(blob) {
  // eslint-disable-next-line no-useless-escape
  return blob.split(/[\s\(\)\{\}]+/);
}

export function tokenizeByLetter(blob) {
  return blob.split();
}
