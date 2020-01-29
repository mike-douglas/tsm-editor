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

export const symbols = [
  new TSMKeyword('DBGlobalHistorical', 'Global Historical Price'),
  new TSMKeyword('DBGlobalMarketAvg', 'Global Market Value Average'),
  new TSMKeyword('DBGlobalMinBuyoutAvg', 'Global Minimum Buyout Average'),
  new TSMKeyword('DBGlobalSaleAvg', 'Global Sale Average'),
  new TSMKeyword('DBHistorical', 'Historical Price'),
  new TSMKeyword('DBMarket', 'Market Value'),
  new TSMKeyword('DBMinBuyout', 'Minimum Buyout'),
  new TSMKeyword('DBRegionHistorical', 'Region Historical Price'),
  new TSMKeyword('DBRegionMarketAvg', 'Region Market Value Average'),
  new TSMKeyword('DBRegionMinBuyoutAvg', 'Region Minimum Buyout Average'),
  new TSMKeyword('DBRegionSaleAvg', 'Region Sale Average'),
  new TSMKeyword('Crafting', 'Crafting Cost'),
  new TSMKeyword('Destroy', 'Destroy Value'),
  new TSMKeyword('VendorBuy', 'Buy from Vendor'),
  new TSMKeyword('VendorSell', 'Sell to Vendor'),
  new TSMKeyword('avgBuy', 'Average Buy Price'),
  new TSMKeyword('avgSell', 'Average Sell Price'),
  new TSMKeyword('matPrice', 'Crafting Material Cost'),
  new TSMKeyword('maxBuy', 'Max Buy Price'),
  new TSMKeyword('maxSell', 'Max Sell Price'),
];

export const functions = [
  new TSMFunction('min', ['a', 'b'], 'Returns the numerical minimum between a and b'),
  new TSMFunction('max', ['a', 'b'], 'Returns the numerical maximum between a and b'),
  new TSMFunction('first', ['n..'], 'Returns the first valid price in the list'),
  new TSMFunction('check', ['n', 'b', 'c'], 'If the first parameter is greater than 0, return the second parameter. Otherwise, return the third parameter.'),
];

export const specialFeatures = [
  new TSMKeyword('[Item Name]', 'Reference an item by name.'),
  new TSMKeyword('item:ID', 'Reference an item by ID.'),
];

export function findMatches(search) {
  const regex = new RegExp(
    search.replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]'),
    'ig',
  );

  return {
    functions: functions.filter(f => regex.test(f.name)),
    symbols: symbols.filter(k => regex.test(k.name)),
  };
}
