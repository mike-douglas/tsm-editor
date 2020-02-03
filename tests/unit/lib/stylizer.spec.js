import { reformatter, stylizeString } from '@/lib/stylizer.js';
import { symbols, functions, specialFeatures } from '@/lib/definitions.js';

describe('reformatter', () => {
  it('adds a single space after commas', () => {
    const text = 'first(Crafting,DBMarket,DBRegionMarketAvg)';
    expect(reformatter(text)).toMatch('first(Crafting, DBMarket, DBRegionMarketAvg)');
  });

  it('adds does not remove extraneous spaces', () => {
    expect(reformatter('DBMarket   +DBRegionMarketAvg')).toMatch('DBMarket    + DBRegionMarketAvg');
  });

  it('corrects lowercase symbol names', () => {
    expect(reformatter('dbmarket')).toMatch('DBMarket');
  });

  it('corrects wrong-cased function names', () => {
    expect(reformatter('MAX()')).toMatch('max()');
  });

  it('pads item links with a space WITHOUT adding spaces inside the brackets', () => {
    expect(reformatter('[Bag of Tricks  with extra space there]')).toMatch(' [Bag of Tricks  with extra space there] ');
  });
});

describe('stylizeString', () => {
  it('correctly tags math operations', () => {
    '+-*/%'.split('').forEach((operation) => {
      expect(stylizeString(`2 ${operation} 2`)).toMatch(`<span class="token numeric">2</span> <span class="token maths">${operation}</span> <span class="token numeric">2</span>`);
    });
  });

  it('correctly tags item strings', () => {
    expect(stylizeString('[Foo of Bar]')).toMatch('<span class="token item">[Foo of Bar]</span>');
    expect(stylizeString('i:31337')).toMatch('<span class="token item">i:<span class="token numeric">31337</span></span>');
  });

  it('correctly tags currency strings', () => {
    const currency = {
      '200g': '<span class="token currency gold"><span class="token numeric">200</span>g</span>',
      '30s': '<span class="token currency silver"><span class="token numeric">30</span>s</span>',
      '10c': '<span class="token currency copper"><span class="token numeric">10</span>c</span>',
      '523g44s1c': '<span class="token currency gold"><span class="token numeric">523</span>g</span><span class="token currency silver"><span class="token numeric">44</span>s</span><span class="token currency copper"><span class="token numeric">1</span>c</span>',
    };

    Object.keys(currency).forEach((key) => {
      expect(stylizeString(key)).toMatch(currency[key]);
    });
  });

  it('correctly tags each defined function string', () => {
    functions.forEach((func) => {
      expect(stylizeString(`${func.name}()`)).toContain('class="token function"');
      expect(stylizeString(`${func.name} ()`)).toContain('class="token function"');
    });
  });

  it('correctly tags each defined symbol string', () => {
    symbols.forEach((symbol) => {
      expect(stylizeString(symbol.name)).toContain('class="token symbol"');
    });
  });

  it('correctly tags parentheses strings', () => {
    expect(stylizeString('(')).toMatch('<span class="token parens lparen">(</span>');
    expect(stylizeString(')')).toMatch('<span class="token parens rparen">)</span>');
  });

  it('correctly tags punctuation', () => {
    expect(stylizeString(',')).toMatch('<span class="token punc">,</span>');
  });

  it('correctly tags numeric strings', () => {
    expect(stylizeString('1234231')).toMatch('<span class="token numeric">1234231</span>');
  });
});
