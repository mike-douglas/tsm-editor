class TSMFunction {
  constructor(name, args, definition) {
    this.name = name;
    this.args = args;
    this.definition = definition;
  }
}

class TSMKeyword {
  constructor(name, definition) {
    this.name = name;
    this.definition = definition;
  }
}

export const keywords = [
  new TSMKeyword('DBGlobalHistorical', 'Global Historical Price'),
  new TSMKeyword('DBGlobalMarketAvg', 'Global Market Value Average'),
  new TSMKeyword('Crafting', 'Crafting Cost'),
];

export const functions = [
  new TSMFunction('min', ['a', 'b'], 'Returns the smaller of the two values'),
];

export function findMatches(search) {
  const regex = new RegExp(search, 'i');

  return {
    functions: functions.filter(f => regex.test(f.name)),
    keywords: keywords.filter(k => regex.test(k.name)),
  };
}
