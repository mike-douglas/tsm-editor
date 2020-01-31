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
  new TSMKeyword('DBMinBuyout', 'Minimum Buyout Value'),
  new TSMKeyword('DBRegionHistorical', 'Region Historical Price'),
  new TSMKeyword('DBRegionMarketAvg', 'Region Market Value Average'),
  new TSMKeyword('DBRegionMinBuyoutAvg', 'Region Minimum Buyout Average'),
  new TSMKeyword('DBRegionSaleAvg', 'Region Sale Average'),
  new TSMKeyword('DBRegionSaleRate', 'Number of sales of the item compared to how many expire or get cancelled'),
  new TSMKeyword('DBRegionSoldPerDay', 'Number of times the item sells per day on average'),
  new TSMKeyword('NumExpires', 'Number of times the item has expired since the last time it was sold'),
  new TSMKeyword('ItemQuality', 'Item Quality (0 = poor, 1 = common, 2 = uncommon, 3 = rare, 4 = epic, 5 = legendary)'),
  new TSMKeyword('ItemLevel', 'The item level of the item'),
  new TSMKeyword('RequiredLevel', 'The level required to use or equip the item'),
  new TSMKeyword('Crafting', 'Cost of crafting an item'),
  new TSMKeyword('Destroy', 'Cost of materials if you were to destroy the item'),
  new TSMKeyword('VendorBuy', 'Cost if you were to buy the item from a vendor'),
  new TSMKeyword('VendorSell', 'Cost if you were to sell the item to the vendor'),
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
  new TSMFunction('avg', ['n..'], 'Returns the average of the prices in the list'),
  new TSMFunction('check', ['n', 'b', 'c'], 'If the first parameter is greater than 0 return the second parameter, otherwise return the third parameter'),
  new TSMFunction('convert', ['variable', 'optional_item'], 'Returns the lowest cost conversion of the item being evaluated'),
  new TSMFunction('ifgt', ['a', 'b', 'x', 'y'], 'Returns x if a is greater than b, otherwise it returns y'),
  new TSMFunction('ifgte', ['a', 'b', 'x', 'y'], 'Returns x if a is greater than or equal to b, otherwise it returns y'),
  new TSMFunction('iflt', ['a', 'b', 'x', 'y'], 'Returns x if a is less than b, otherwise it returns y'),
  new TSMFunction('iflte', ['a', 'b', 'x', 'y'], 'Returns x if a is less than or equal to b, otherwise it returns y'),
  new TSMFunction('ifeq', ['a', 'b', 'x', 'y'], 'Returns x if a is equal to b, otherwise it returns y'),
];

export const specialFeatures = [
  new TSMKeyword('[Item Name]', 'Reference an item by name'),
  new TSMKeyword('item:ID', 'Reference an item by ID'),
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
