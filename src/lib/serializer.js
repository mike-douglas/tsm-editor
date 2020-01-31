export function deserialize() {
  const { hash } = window.location;

  if (hash && hash.length > 1) {
    return JSON.parse(unescape(hash.substr(1))).formula;
  }

  return null;
}

export function serializeAndSave(value) {
  const serialized = JSON.stringify({ formula: value });
  const hash = `#${serialized}`;

  if (hash !== window.location.hash) {
    window.history.pushState(null, null, hash);
  }
}
