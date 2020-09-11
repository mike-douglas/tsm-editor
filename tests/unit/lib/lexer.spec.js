/* eslint-disable import/extensions */
import Lexer, { Token } from '@/lib/lexer.js';

function getTokenizedString(t) {
  const result = [];
  let token = null;

  do {
    token = t.getNextToken();
    result.push(token.toString());
  } while (token.type !== Token.EOF);

  return result.join(', ');
}

describe('Lexer', () => {
  it('parses simple numerical operations', () => {
    expect(getTokenizedString(new Lexer('1+2')))
      .toMatch('T(number, 1), T(plus, +), T(number, 2), T(eof, null)');
    expect(getTokenizedString(new Lexer('11234 + 22323')))
      .toMatch('T(number, 11234), T(whitespace,  ), T(plus, +), T(whitespace,  ), T(number, 22323), T(eof, null)');
    expect(getTokenizedString(new Lexer('200%DBMarket')))
      .toMatch('T(number, 200), T(percent, %), T(keyword, DBMarket)');
    expect(getTokenizedString(new Lexer('200*DBMarket')))
      .toMatch('T(number, 200), T(mul, *), T(keyword, DBMarket)');
    expect(getTokenizedString(new Lexer('200-DBMarket')))
      .toMatch('T(number, 200), T(minus, -), T(keyword, DBMarket)');
    expect(getTokenizedString(new Lexer('200+DBMarket')))
      .toMatch('T(number, 200), T(plus, +), T(keyword, DBMarket)');
    expect(getTokenizedString(new Lexer('200/DBMarket')))
      .toMatch('T(number, 200), T(div, /), T(keyword, DBMarket)');
  });
  it('parses strings with keywords and numbers', () => {
    expect(getTokenizedString(new Lexer('DBMarketValue+2')))
      .toMatch('T(keyword, DBMarketValue), T(plus, +), T(number, 2), T(eof, null)');
  });
  it('parses numerical values with denominations for currency', () => {
    expect(getTokenizedString(new Lexer('200g')))
      .toMatch('T(number, 200), T(denom, g)');
    expect(getTokenizedString(new Lexer('200g100s')))
      .toMatch('T(number, 200), T(denom, g), T(number, 100), T(denom, s)');
    // Tests that it does NOT tokenize words with g or s in them (known currency )
    expect(getTokenizedString(new Lexer('gold is not in here')))
      .not.toMatch('T(denom');
  });
  it('parses functions-like strings with keywords and numbers', () => {
    expect(getTokenizedString(new Lexer('min(DBMarketValue, 200g)')))
      .toMatch('T(keyword, min), T(lparen, (), T(keyword, DBMarketValue), T(punc, ,), T(whitespace,  ), T(number, 200), T(denom, g), T(rparen, )), T(eof, null)');
  });
});
