/* eslint-disable import/extensions */
import { reformatter, stylizeString, findRangeOfParensEnclosingCaret } from '@/lib/stylizer.js';
import { symbols, functions } from '@/lib/definitions.js';

describe('stylizeString', () => {
  it('correctly tags percent strings', () => {
    expect(stylizeString('200% DBMarket')).toMatch('<span class="token numeric">200</span><span class="token percent">%</span> <span class="token symbol">DBMarket</span>');
  });

  it('correctly tags math operations', () => {
    ['+', '-', '*', '/'].forEach((operation) => {
      expect(stylizeString(`2 ${operation} 2`)).toMatch(`<span class="token numeric">2</span> <span class="token maths">${operation}</span> <span class="token numeric">2</span>`);
    });
  });

  it('correctly tags item strings', () => {
    expect(stylizeString('[Foo of Bar]')).toMatch('<span class="token brackets lbracket">[</span><span class="token ">Foo</span> <span class="token ">of</span> <span class="token ">Bar</span><span class="token brackets rbracket">]</span>');
    expect(stylizeString('i:31337')).toMatch('<span class="token ">i</span><span class="token punc">:</span><span class="token numeric">31337</span>');
    expect(stylizeString('item:31337')).toMatch('<span class="token ">item</span><span class="token punc">:</span><span class="token numeric">31337</span>');
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
      expect(stylizeString(`${func.name}(10,20)`)).toContain('class="token function"');
      expect(stylizeString(`${func.name} ()`)).toContain('class="token function"');
      expect(stylizeString(`${func.name}(DBMarket, 200g)`)).toContain('class="token function"');
    });
  });

  it('correctly tags each defined symbol string', () => {
    symbols.forEach((symbol) => {
      expect(stylizeString(symbol.name)).toContain('class="token symbol"');
    });
  });

  it('correctly tags numeric strings', () => {
    expect(stylizeString('1234231')).toMatch('<span class="token numeric">1234231</span>');
  });

  it('correctly tags enclosing parenthesis given a caret', () => {
    expect(stylizeString(`max(10,20)`, 5)).toEqual('<span class="token function">max</span><span class="token underlight parens lparen">(</span><span class="token numeric">10</span><span class="token punc">,</span><span class="token numeric">20</span><span class="token underlight parens rparen">)</span>');
    expect(stylizeString(`min ()`, 1)).toEqual('<span class="token function">min</span> <span class="token parens lparen">(</span><span class="token parens rparen">)</span>');
  });

});

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

  it('item link spaces are not changed inside brackets', () => {
    expect(reformatter('[Bag of Tricks  with extra space there]')).toMatch('[Bag of Tricks  with extra space there]');
  });

  it('does not add a space between a value and %', () => {
    expect(reformatter('200% DBMarket')).toEqual('200% DBMarket');
  });
});

describe('findRangeOfParensEnclosingCaret', () => {
  it('handles strings of just empty parens', () => {
    expect(findRangeOfParensEnclosingCaret('()', 10)).toEqual({ startOffset: 0, endOffset: 0 });
  });

  it('handles strings of 0 length', () => {
    expect(findRangeOfParensEnclosingCaret('', 10)).toEqual({ startOffset: 0, endOffset: 0 });
  });

  it('handles strings with mismatching parens', () => {
    expect(findRangeOfParensEnclosingCaret('((((', 2)).toEqual({ startOffset: 0, endOffset: 0 });
    expect(findRangeOfParensEnclosingCaret('(((())', 2)).toEqual({ startOffset: 0, endOffset: 0 });
  });

  it('handles strings with matching parens', () => {
    expect(findRangeOfParensEnclosingCaret('a(b(c)b)a', 3)).toEqual({ startOffset: 4, endOffset: 6 });
    expect(findRangeOfParensEnclosingCaret('a(b(c)b)a', 2)).toEqual({ startOffset: 2, endOffset: 8 });
  });
});
