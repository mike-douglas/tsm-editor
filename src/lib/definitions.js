export const kwTags = {
  PRICE_SOURCE: 'price',
  VALUE_SOURCE: 'value',

  TSM_CORE: 'core',
  TSM_ACCOUNTING: 'accounting',
  TSM_CRAFTING: 'crafting',
  TSM_OPERATIONS: 'operations',
  TSM_AUCTION: 'auction',
  TSM_AUCTION_REALM: 'realm',
  TSM_AUCTION_REGION: 'region',
  TSM_SOURCE_INTERNAL: 'internal',
  TSM_SOURCE_EXTERNAL: 'external',
};

class TSMFunction {
  constructor(name, args, definition) {
    this.name = name;
    this.args = args;
    this.definition = definition;
  }

  getCompletion() {
    return `${this.name}(`;
  }
}

class TSMKeyword {
  constructor(name, definition, tags) {
    this.name = name;
    this.definition = definition;
    this.tags = tags;
  }

  getCompletion() {
    return this.name;
  }
}

export const symbols = [
  // Price sources
  // Accounting
  new TSMKeyword(
    'AvgBuy',
    'The average buy price paid for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_ACCOUNTING],
  ),
  new TSMKeyword(
    'AvgSell',
    'The average sale price sold for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_ACCOUNTING],
  ),
  new TSMKeyword(
    'MaxBuy',
    'The maximum buy price paid for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_ACCOUNTING],
  ),
  new TSMKeyword(
    'MaxSell',
    'The maximum sale price sold for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_ACCOUNTING],
  ),
  new TSMKeyword(
    'MinBuy',
    'The minimum buy price paid for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_ACCOUNTING],
  ),
  new TSMKeyword(
    'MinSell',
    'The minimum sale price sold for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_ACCOUNTING],
  ),
  new TSMKeyword(
    'SmartAvgBuy',
    'The average buy price of the last `x` purchases of the item, where `x` is the quantity of the item you possess',
    [kwTags.PRICE_SOURCE, kwTags.TSM_ACCOUNTING],
  ),

  // Crafting
  new TSMKeyword(
    'Crafting',
    'The sum of the material prices (`MatPrice`) used to craft the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_CRAFTING],
  ),
  new TSMKeyword(
    'MatPrice',
    'The material price for the item used in crafting a recipe that you have learned',
    [kwTags.PRICE_SOURCE, kwTags.TSM_CRAFTING],
  ),

  // Core
  new TSMKeyword(
    'Destroy',
    'The average sum of the price of the components received when destroying the item through milling, prospecting, or disenchanting',
    [kwTags.PRICE_SOURCE, kwTags.TSM_CORE],
  ),
  new TSMKeyword(
    'VendorBuy',
    'The price of the item when bought from a vendor',
    [kwTags.PRICE_SOURCE, kwTags.TSM_CORE],
  ),
  new TSMKeyword(
    'VendorSell',
    'The price of the item when sold to a vendor',
    [kwTags.PRICE_SOURCE, kwTags.TSM_CORE],
  ),

  // Operations
  new TSMKeyword(
    'AuctioningOpMax',
    'The maximum post price from the first Auctioning Operation assigned to the group for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_OPERATIONS],
  ),
  new TSMKeyword(
    'AuctioningOpMin',
    'The minimum post price from the first Auctioning Operation assigned to the group for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_OPERATIONS],
  ),
  new TSMKeyword(
    'ShoppingOpMax',
    'The maximum shopping price from the first Shopping Operation assigned to the group for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_OPERATIONS],
  ),
  new TSMKeyword(
    'SniperOpMax',
    'The maximum sniping price from the first Sniping Operation assigned to the group for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_OPERATIONS],
  ),
  new TSMKeyword(
    'AuctioningOpNormal',
    'The normal post price from the first Auctioning Operation assigned to the group for the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_OPERATIONS],
  ),

  // Auctions - Realm
  new TSMKeyword(
    'DBHistorical',
    'The 60-day average `DBMarket` value for the item on the Auction House',
    [kwTags.PRICE_SOURCE, kwTags.TSM_AUCTION, kwTags.TSM_AUCTION_REALM],
  ),
  new TSMKeyword(
    'DBMarket',
    'The weighted 14-day average of the auctions listed for the item on the Auction House, favoring the most recent 3 days of pricing data',
    [kwTags.PRICE_SOURCE, kwTags.TSM_AUCTION, kwTags.TSM_AUCTION_REALM],
  ),
  new TSMKeyword(
    'DBMinBuyout',
    'The lowest priced auction on the Auction House of the item',
    [kwTags.PRICE_SOURCE, kwTags.TSM_AUCTION, kwTags.TSM_AUCTION_REALM],
  ),

  // Auctions - Region
  new TSMKeyword(
    'DBRegionHistorical',
    'The 60-day average of `DBRegionMarketAvg` for the item in your region',
    'Returns the 60-day average of DBRegionMarketAvg for a particular item in your region',
    [kwTags.PRICE_SOURCE, kwTags.TSM_AUCTION, kwTags.TSM_AUCTION_REGION],
  ),
  new TSMKeyword(
    'DBRegionMarketAvg',
    'The average of `DBMarket` for the item calculated across all realms in your region',
    [kwTags.PRICE_SOURCE, kwTags.TSM_AUCTION, kwTags.TSM_AUCTION_REGION],
  ),
  new TSMKeyword(
    'DBRegionSaleAvg',
    'The average sale and purchase price for the item in your region',
    [kwTags.PRICE_SOURCE, kwTags.TSM_AUCTION, kwTags.TSM_AUCTION_REGION],
  ),

  // Value Sources
  // TSM Accounting
  new TSMKeyword(
    'NumExpires',
    'The number of times the item has expired or been cancelled from the Auction House since the last time it was sold',
    [kwTags.VALUE_SOURCE, kwTags.TSM_ACCOUNTING, kwTags.TSM_SOURCE_INTERNAL],
  ),
  new TSMKeyword(
    'SaleRate',
    'A decimal number that represents your personal sale rate for the item.\n\nEx: a value of `0.4` indicates that the item sold 40% of the time it was posted',
    [kwTags.VALUE_SOURCE, kwTags.TSM_ACCOUNTING, kwTags.TSM_SOURCE_INTERNAL],
  ),

  // Core
  new TSMKeyword(
    'ItemLevel',
    'The itemlevel of the item',
    [kwTags.VALUE_SOURCE, kwTags.TSM_CORE, kwTags.TSM_SOURCE_EXTERNAL],
  ),
  new TSMKeyword(
    'ItemQuality',
    'The item quality, represented as a number between 0 and 5.\n\n**0 = poor, 1 = common, 2 = uncommon, 3 = rare, 4 = epic, 5 = legendary**',
    [kwTags.VALUE_SOURCE, kwTags.TSM_CORE, kwTags.TSM_SOURCE_EXTERNAL],
  ),
  new TSMKeyword(
    'NumInventory',
    'The quantity of the item possessed',
    [kwTags.VALUE_SOURCE, kwTags.TSM_CORE, kwTags.TSM_SOURCE_EXTERNAL],
  ),
  new TSMKeyword(
    'RequiredLevel',
    'The level required to use or equip the item',
    [kwTags.VALUE_SOURCE, kwTags.TSM_CORE, kwTags.TSM_SOURCE_EXTERNAL],
  ),

  // Auctions - Region
  new TSMKeyword(
    'DBRegionSaleRate',
    'A decimal number that represents the average sale rate for the item across all realms in your region.\n\nEx: a value of `0.4` indicates that the item will sell 40% of the times it is posted per Auction House in your region',
    [
      kwTags.VALUE_SOURCE,
      kwTags.TSM_ACCOUNTING,
      kwTags.TSM_SOURCE_EXTERNAL,
      kwTags.TSM_AUCTION_REGION,
    ],
  ),
  new TSMKeyword(
    'DBRegionSoldPerDay',
    'A decimal number that represents the volume of the item that is sold on average per Auction House per day in your region',
    [
      kwTags.VALUE_SOURCE,
      kwTags.TSM_ACCOUNTING,
      kwTags.TSM_SOURCE_EXTERNAL,
      kwTags.TSM_AUCTION_REGION,
    ],
  ),
];

export const functions = [
  new TSMFunction(
    'min',
    ['n...'],
    'Return the lowest value of the parameters in the list',
  ),
  new TSMFunction(
    'max',
    ['n...'],
    'Returns the highest value of the parameters in the list',
  ),
  new TSMFunction(
    'first',
    ['n...'],
    'Returns the first valid parameter in the list',
  ),
  new TSMFunction(
    'avg',
    ['n...'],
    'Returns the average calculated using the valid parameters in the list',
  ),
  new TSMFunction(
    'check',
    ['a', 'b', 'c'],
    'Returns the parameter `b` if `a` is greater than 0. Otherwise, return `c`',
  ),
  new TSMFunction(
    'convert',
    ['p'],
    'Returns the lowest cost of converting the item to other items. Conversions include milling, prospecting, transforming (like greater essences to lesser essences), and vendor trades for inks',
  ),
  new TSMFunction(
    'ifgt',
    ['a', 'b', 'x', 'y'],
    'Returns `x` if `a` is greater than `b`, otherwise return `y`',
  ),
  new TSMFunction(
    'ifgte',
    ['a', 'b', 'x', 'y'],
    'Returns `x` if `a` is greater than **or equal to** `b`, otherwise return `y`',
  ),
  new TSMFunction(
    'iflt',
    ['a', 'b', 'x', 'y'],
    'Returns `x` if `a` is less than `b`, otherwise return `y`',
  ),
  new TSMFunction(
    'iflte',
    ['a', 'b', 'x', 'y'],
    'Returns `x` if `a` is less than **or equal to** `b`, otherwise return `y`',
  ),
  new TSMFunction(
    'ifeq',
    ['a', 'b', 'x', 'y'],
    'Returns `x` if `a` is equal to `b`, otherwise return `y`',
  ),
  new TSMFunction(
    'round',
    ['x', 'y'],
    'Returns the rounded value of `x` using Standard Rounding. If `y` is present, the returned value will be a multiple of `y`',
  ),
  new TSMFunction(
    'roundup',
    ['x', 'y'],
    'Returns the rounded up value of `x`. If `y` is present, the returned value will be a multiple of `y`',
  ),
  new TSMFunction(
    'rounddown',
    ['x', 'y'],
    'Returns the rounded down value of `x`. If `y` is present, the returned value will be a multiple of `y`',
  ),
];

export const specialFeatures = [
  new TSMKeyword('[Item Link]', 'Reference an item by link'),
  new TSMKeyword('i:ID', 'Reference an item by ID'),
];

export function findMatches(search) {
  const regex = new RegExp(
    search.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'),
    'ig',
  );

  return {
    functions: functions.filter(f => regex.test(f.name)),
    symbols: symbols.filter(k => regex.test(k.name)),
  };
}
