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
  new TSMKeyword('Destroy', 'Value of materials if you were to destroy the item'),
  new TSMKeyword('VendorBuy', 'Cost if you were to buy the item from a vendor'),
  new TSMKeyword('VendorSell', 'Value if you were to sell the item to the vendor'),
  new TSMKeyword('AvgBuy', 'Average Buy Price'),
  new TSMKeyword('AvgSell', 'Average Sell Price'),
  new TSMKeyword('Crafting', 'Total cost of crafting the item (sum of all MatPrices for the item)'),
  new TSMKeyword('MatPrice', 'The cost of a single crafting material'),
  new TSMKeyword('MinSell', 'Minimum sell price that you sold the item'),
  new TSMKeyword('MinBuy', 'Minimum buy price that you bought the item'),
  new TSMKeyword('MaxBuy', 'Max buy price that you purchased the item'),
  new TSMKeyword('MaxSell', 'Max sell price that you sold the item'),
  new TSMKeyword('BaseItem', 'Reference the base item (without item variations)'),
];

export const functions = [
  new TSMFunction('min', ['n..'], 'Returns the numerical minimum of the prices in the list'),
  new TSMFunction('max', ['n..'], 'Returns the numerical maximum of the prices in the list'),
  new TSMFunction('first', ['n..'], 'Returns the first valid price in the list'),
  new TSMFunction('avg', ['n..'], 'Returns the average of the prices in the list'),
  new TSMFunction('check', ['n', 'b', 'c'], 'If the first parameter is greater than 0 return the second parameter, otherwise return the third parameter'),
  new TSMFunction('convert', ['variable'], 'Returns the lowest cost conversion of the item being evaluated'),
  new TSMFunction('ifgt', ['a', 'b', 'x', 'y'], 'Returns x if a is greater than b, otherwise it returns y'),
  new TSMFunction('ifgte', ['a', 'b', 'x', 'y'], 'Returns x if a is greater than or equal to b, otherwise it returns y'),
  new TSMFunction('iflt', ['a', 'b', 'x', 'y'], 'Returns x if a is less than b, otherwise it returns y'),
  new TSMFunction('iflte', ['a', 'b', 'x', 'y'], 'Returns x if a is less than or equal to b, otherwise it returns y'),
  new TSMFunction('ifeq', ['a', 'b', 'x', 'y'], 'Returns x if a is equal to b, otherwise it returns y'),
  new TSMFunction('round', ['x', 'y'], 'Rounds x to the nearest multiple of y'),
  new TSMFunction('roundup', ['x', 'y'], 'Rounds x up to the nearest multiple of y'),
  new TSMFunction('rounddown', ['x', 'y'], 'Rounds x down to the nearest multiple of y'),
];

export const specialFeatures = [
  new TSMKeyword('[Item Link]', 'Reference an item by link'),
  new TSMKeyword('i:ID', 'Reference an item by ID'),
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
