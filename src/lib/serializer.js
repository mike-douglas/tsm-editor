import codec from 'json-url';

const lzw = codec('lzw');

export function deserialize() {
  const { hash } = window.location;

  if (hash && hash.length > 1) {
    return lzw.decompress(hash.substr(1)).then(json => json.formula);
  }

  return new Promise((_, r) => r(Error('Parse error')));
}

export function serializeAndSave(value) {
  if (value === null || value.length < 1) {
    return new Promise((_, r) => r(Error('Nothing to save')));
  }

  return lzw.compress({ formula: value }).then((serialized) => {
    const hash = `#${serialized}`;

    if (hash !== window.location.hash) {
      window.history.pushState(window.location.pathname, null, hash);
    }

    return serialized;
  });
}
