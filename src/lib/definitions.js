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
  new TSMKeyword('avgBuy', 'Avg Buy Price'),
  new TSMKeyword('avgSell', 'Avg Sell Price'),
  new TSMKeyword('Crafting', 'Crafting Cost'),
  new TSMKeyword('DBGlobalHistorical', 'AuctionDB - Global Historical Price'),
  new TSMKeyword('DBGlobalMarketAvg', 'AuctionDB - Global Market Value Average'),
  new TSMKeyword('DBGlobalMinBuyoutAvg', 'AuctionDB - Global Minimum Buyout Average'),
  new TSMKeyword('DBGlobalSaleAvg', 'AuctionDB - Global Sale Average'),
  new TSMKeyword('DBHistorical', 'AuctionDB - Historical Price'),
  new TSMKeyword('DBMarket', 'AuctionDB - Market Value'),
  new TSMKeyword('DBMinBuyout', 'AuctionDB - Minimum Buyout'),
  new TSMKeyword('DBRegionHistorical', 'AuctionDB - Region Historical Price'),
  new TSMKeyword('DBRegionMarketAvg', 'AuctionDB - Region Market Value Average'),
  new TSMKeyword('DBRegionMinBuyoutAvg', 'AuctionDB - Region Minimum Buyout Average'),
  new TSMKeyword('DBRegionSaleAvg', 'AuctionDB - Region Sale Average'),
  new TSMKeyword('Destroy', 'Destroy Value'),
  new TSMKeyword('matPrice', 'Crafting Material Cost'),
  new TSMKeyword('maxBuy', 'Max Buy Price'),
  new TSMKeyword('maxSell', 'Max Sell Price'),
  new TSMKeyword('VendorBuy', 'Buy from Vendor'),
  new TSMKeyword('VendorSell', 'Sell to Vendor'),
];

export const functions = [
  new TSMFunction('min', ['a', 'b'], 'Returns the numerical minimum between a and b'),
  new TSMFunction('max', ['a', 'b'], 'Returns the numerical maximum between a and b'),
  new TSMFunction('first', ['n..'], 'Returns the first valid price in the list'),
  new TSMFunction('check', ['n', 'b', 'c'], 'If the first parameter is greater than 0, return the second parameter. Otherwise, return the third parameter.'),
];

export function findMatches(search) {
  const regex = new RegExp(search.replace('(', '\\(').replace(')', '\\)'), 'i');

  return {
    functions: functions.filter(f => regex.test(f.name)),
    keywords: keywords.filter(k => regex.test(k.name)),
  };
}
